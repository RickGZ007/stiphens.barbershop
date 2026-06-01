import { useState, useEffect, useRef } from "react";
import { getDocument, getCollection } from "../services/firestore";

// Cache em memoria — evita multiplas requisicoes para o mesmo dado
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { cache.delete(key); return null; }
  return entry.data;
}

function setCached(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

export function useDocument(col, id = "main") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const key = `${col}/${id}`;
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const cached = getCached(key);
    if (cached) { setData(cached); setLoading(false); return; }

    getDocument(col, id).then(d => {
      if (!mounted.current) return;
      setCached(key, d);
      setData(d);
      setLoading(false);
    }).catch(() => { if (mounted.current) setLoading(false); });

    return () => { mounted.current = false; };
  }, [key]);

  return { data, loading };
}

export function useCollection(col) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const cached = getCached(col);
    if (cached) { setData(cached); setLoading(false); return; }

    getCollection(col).then(d => {
      if (!mounted.current) return;
      setCached(col, d);
      setData(d);
      setLoading(false);
    }).catch(() => { if (mounted.current) setLoading(false); });

    return () => { mounted.current = false; };
  }, [col]);

  return { data, loading };
}
