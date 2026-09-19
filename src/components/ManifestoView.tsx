import React from 'react';
import { BookOpen, Heart, Users, Briefcase, Sparkles, Compass, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ManifestoView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#f3f4f6] pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/10 text-[#9ca3af] hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Retornar à Obra
        </button>

        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold mb-4 border border-pink-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Manifesto Interativo
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Contrastes: Diálogo entre Polos
          </h1>
          <p className="text-lg text-[#9ca3af] leading-relaxed">
            Uma obra de arte interativa que investiga o dualismo político, a tensão cromática e a possibilidade sintética da convivência através da computação criativa.
          </p>
        </header>

        <div className="space-y-12">
          {/* Seção 1: Fundamentação Filosófica */}
          <section className="bg-[#14141e]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Fundamentação Filosófica e Tecnológica</h2>
            </div>

            <div className="space-y-6 text-[#9ca3af] leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Vilém Flusser e a Caixa Preta</h3>
                <p>
                  Inspirado pelas reflexões de Vilém Flusser sobre a técnica e as imagens técnicas, <em className="text-white">Contrastes</em> trata a interface digital não como uma janela neutra, mas como um aparelho. Ao interagir com as partículas polarizadas, o participante torna-se co-criador de uma realidade sintética, onde as decisões de toque ou proximidade redesenham o campo de força entre antagonismos aparentes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Yuk Hui e a Cosmotécnica</h3>
                <p>
                  A partir do pensamento de Yuk Hui sobre a cosmotécnica, buscamos superar a dicotomia simplista entre tecnologia universal e localidade. As paletas políticas aqui representadas (seja o preto e o branco, o vermelho e o azul, ou outros espectros) simbolizam que a tecnologia e a política não são neutras: elas carregam valores cosmopolíticos que necessitam de negociação constante para evitar a fragmentação destrutiva.
                </p>
              </div>
            </div>
          </section>

          {/* Seção 2: Alinhamento com os ODS */}
          <section className="bg-[#14141e]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Alinhamento com os ODS da ONU</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold">
                    <Heart className="w-5 h-5" />
                    <span>ODS 3</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Saúde e Bem-Estar</h4>
                  <p className="text-sm text-[#9ca3af]">
                    O movimento harmônico das partículas e a interatividade meditativa promovem foco, redução do estresse e alfabetização emocional diante de conflitos.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-amber-400 font-bold">
                    <Users className="w-5 h-5" />
                    <span>ODS 4</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Educação de Qualidade</h4>
                  <p className="text-sm text-[#9ca3af]">
                    Ferramenta pedagógica para escolas e educadores debaterem polarização política, empatia e pensamento crítico através da arte generativa.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-purple-400 font-bold">
                    <Briefcase className="w-5 h-5" />
                    <span>ODS 8</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Trabalho Decente e Inovação</h4>
                  <p className="text-sm text-[#9ca3af]">
                    Estimula a inovação artística e tecnológica aberta, valorizando a criatividade humana na era da automação e da inteligência artificial.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Seção 3: Orientações para Professores e Crianças */}
          <section className="bg-[#14141e]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Orientações Pedagógicas para Educadores</h2>
            </div>

            <ul className="space-y-4 text-[#9ca3af] list-disc list-inside">
              <li>
                <strong className="text-white">Mediação do Conflito:</strong> Use a tela cheia em sala de aula para discutir como duas cores opostas podem se repelir ou formar padrões harmônicos dependendo da força e da sensibilidade aplicadas.
              </li>
              <li>
                <strong className="text-white">Exploração Multimodal:</strong> Incentive os alunos a experimentarem o modo de câmera ou toque na tela para perceberem como a presença física afeta o coletivo.
              </li>
              <li>
                <strong className="text-white">Diálogo Cidadão:</strong> Conecte a dinâmica das partículas físicas com debates sobre diálogo democrático, escuta ativa e construção de pontes em sociedades polarizadas.
              </li>
            </ul>
          </section>
        </div>

        <footer className="mt-16 text-center text-sm text-[#9ca3af] border-t border-white/10 pt-8">
          <p>Projeto Contrastes • Arte Interativa Baseada em p5.js e React • Metodologia 5I’s</p>
        </footer>
      </div>
    </div>
  );
};
