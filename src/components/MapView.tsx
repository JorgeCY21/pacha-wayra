import { useEffect, useRef } from "react";
import "ol/ol.css";
import "../styles/MapView.css";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { fromLonLat, toLonLat } from "ol/proj";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

const MapView = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Capa base
    const baseLayer = new TileLayer({ source: new OSM() });

    // Capa de resultados
    const resultSource = new VectorSource();
    const resultLayer = new VectorLayer({
      source: resultSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: "#1976d2" }),
          stroke: new Stroke({ color: "#fff", width: 2 }),
        }),
      }),
    });

    // Inicializar mapa
    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, resultLayer],
      view: new View({
        center: fromLonLat([-75.0152, -9.19]), // Perú
        zoom: 6,
      }),
    });

    // Función de búsqueda
    const buscar = async () => {
      const input = document.getElementById("search") as HTMLInputElement;
      if (!input) return;
      const q = input.value.trim();
      if (!q) return;

      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&accept-language=es&countrycodes=pe&q=${encodeURIComponent(
        q
      )}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!data || data.length === 0) {
          alert("No se encontraron resultados en Perú.");
          return;
        }

        resultSource.clear();
        const lon = parseFloat(data[0].lon);
        const lat = parseFloat(data[0].lat);

        // Mostrar coordenadas del resultado
        alert(`📍 Resultado encontrado:\nLat: ${lat.toFixed(6)}\nLon: ${lon.toFixed(6)}`);

        const feat = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          name: data[0].display_name,
        });
        resultSource.addFeature(feat);
        map.getView().animate({ center: fromLonLat([lon, lat]), zoom: 12 });
      } catch (err) {
        console.error("Error al buscar:", err);
      }
    };

    // Eventos del buscador
    const btn = document.getElementById("btnSearch");
    const input = document.getElementById("search") as HTMLInputElement;
    btn?.addEventListener("click", buscar);
    input?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") buscar();
    });

    // Evento de clic en mapa
    map.on("singleclick", (evt) => {
      const coord = toLonLat(evt.coordinate);
      alert(
        `📍 Coordenadas seleccionadas:\nLat: ${coord[1].toFixed(
          6
        )}\nLon: ${coord[0].toFixed(6)}`
      );
      resultSource.clear();
      const feat = new Feature({
        geometry: new Point(evt.coordinate),
      });
      resultSource.addFeature(feat);
    });

    // Cleanup
    return () => {
      btn?.removeEventListener("click", buscar);
      input?.removeEventListener("keydown", (e) => {
        if ((e as KeyboardEvent).key === "Enter") buscar();
      });
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="map-container">
      <div className="map-sidebar">
        <input id="search" type="text" placeholder="Buscar lugar o ciudad..." />
        <button id="btnSearch">Buscar</button>
      </div>
      <div ref={mapRef} id="map"></div>
    </div>
  );
};

export default MapView;
