import React from 'react';
import { X, Sparkles, Heart, BookOpen, Users, Compass } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#121218] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 text-slate-100">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-red-600/30 to-blue-600/30 border border-white/10">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">CONTRASTES</h2>
              <p className="text-xs text-slate-400">Obra de Arte Interativa • Metodologia 5I's</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 text-sm md:text-base text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              A Proposta Poética e Filosófica
            </h3>
            <p>
              <strong className="text-white">CONTRASTES</strong> explora o dualismo político, social e de ideias através da metáfora visual de partículas cromáticas. Polos opostos — seja na política, nas crenças ou nas visões de mundo — raramente existem no vácuo; eles se encontram, colidem e se misturam.
            </p>
            <p className="mt-2">
              Quando as partículas de cores distintas interagem guiadas pelo toque, pelo movimento ou pela presença do observador, traços impressionistas emergem. A aspereza inicial da oposição dá lugar a texturas complexas e harmônicas, sugerindo que o diálogo e a convivência geram novas perspectivas coletivas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
              <div className="flex items-center gap-2 font-semibold text-red-400 mb-2">
                <Heart className="w-4 h-4" />
                <span>ODS 3: Saúde e Bem-Estar</span>
              </div>
              <p className="text-xs text-slate-400">
                Promove a saúde mental, reduzindo o estresse e a polarização tóxica através da contemplação estética e da expressão interativa imersiva.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20">
              <div className="flex items-center gap-2 font-semibold text-blue-400 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>ODS 4: Educação de Qualidade</span>
              </div>
              <p className="text-xs text-slate-400">
                Estimula o pensamento crítico, a alfabetização visual e a compreensão de fenômenos complexos de dinâmica de sistemas e polaridade.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
              <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-2">
                <Users className="w-4 h-4" />
                <span>ODS 8: Trabalho Decente</span>
              </div>
              <p className="text-xs text-slate-400">
                Valoriza a inovação tecnológica artística, a criatividade e a colaboração aberta em ambientes digitais inclusivos.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="font-semibold text-white mb-2">Como Interagir:</h4>
            <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-400">
              <li><strong className="text-slate-200">Mouse ou Toque:</strong> Arraste ou toque na tela para atrair e agitar as partículas, misturando os polos.</li>
              <li><strong className="text-slate-200">Câmera de Presença:</strong> Ative o modo câmera para que sua silhueta física desloque os fluxos coloridos em tempo real.</li>
              <li><strong className="text-slate-200">Paletas Ideológicas:</strong> Alterne entre diferentes pares cromáticos na barra de controle flutuante.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25"
          >
            Explorar Obra
          </button>
        </div>
      </div>
    </div>
  );
};
