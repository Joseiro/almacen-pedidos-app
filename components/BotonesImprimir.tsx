"use client";

import Link from "next/link";

export default function BotonesImprimir() {
  return (
    <div className="print:hidden flex justify-end gap-4 mb-8 border-b border-gray-200 pb-4">
      <Link 
        href="/" 
        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
      >
        ← Volver al Panel
      </Link>
      <button 
        onClick={() => window.print()} 
        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black font-medium shadow-sm"
      >
        🖨️ Imprimir Albarán
      </button>
    </div>
  );
}