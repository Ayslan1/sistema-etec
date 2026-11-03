import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  BookOpen, 
  Download, 
  Search, 
  PlusCircle, 
  Building2, 
  HelpCircle, 
  ChevronRight, 
  Paperclip, 
  Send, 
  LogOut, 
  Bell, 
  Filter, 
  Info, 
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

// Dados Iniciais do Aluno
const STUDENT_DATA = {
  name: "Maria Eduarda Silva",
  rm: "202410928",
  course: "Técnico em Desenvolvimento de Sistemas",
  period: "Noturno",
  module: "3º Semestre",
  unit: "ETEC Bento Quirino (Campinas - SP)",
  email: "maria.silva123@etec.sp.gov.br",
  status: "Matriculado (Ativo)"
};

// Requerimentos Iniciais Fictícios
const INITIAL_REQUESTS = [
  {
    id: "REQ-2026-0841",
    type: "Declaração de Matrícula",
    category: "Documentos",
    date: "28/10/2026",
    status: "Pronto para Retirada",
    statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    priority: "Normal",
    description: "Necessito da declaração atualizada referente ao 2º semestre de 2026 para fins de estágio supervisionado.",
    history: [
      { date: "28/10/2026 09:30", note: "Solicitação registrada pelo aluno no portal." },
      { date: "28/10/2026 14:15", note: "Recebido pela Secretaria Acadêmica." },
      { date: "29/10/2026 11:00", note: "Documento emitido, assinado digitalmente e disponível no balcão de atendimento." }
    ],
    downloadable: true
  },
  {
    id: "REQ-2026-0792",
    type: "Aproveitamento de Estudos",
    category: "Pedagógico",
    date: "15/10/2026",
    status: "Em Análise",
    statusColor: "bg-amber-100 text-amber-800 border-amber-300",
    priority: "Alta",
    description: "Solicito dispensa da componente 'Banco de Dados I' com base no histórico de curso prévio na Fatec.",
    history: [
      { date: "15/10/2026 16:40", note: "Solicitação protocolada com 2 anexos." },
      { date: "18/10/2026 10:20", note: "Encaminhado para avaliação do Coordenador de Curso." }
    ],
    downloadable: false
  },
  {
    id: "REQ-2026-0610",
    type: "Segunda Via de Carteirinha Escolar",
    category: "Secretaria",
    date: "02/09/2026",
    status: "Concluído",
    statusColor: "bg-blue-100 text-blue-800 border-blue-300",
    priority: "Baixa",
    description: "Perda do documento original no transporte público.",
    history: [
      { date: "02/09/2026 11:10", note: "Pedido efetuado." },
      { date: "05/09/2026 15:00", note: "Carteirinha entregue presencialmente ao estudante." }
    ],
    downloadable: false
  }
];

// Perguntas Frequentes da ETEC
const FAQ_ITEMS = [
  {
    q: "Qual o prazo padrão para a emissão de Declarações de Matrícula?",
    a: "Declarações simples de matrícula possuem emissão imediata digital pelo sistema ou em até 2 dias úteis caso necessitem de assinatura presencial com carimbo da diretoria de serviços."
  },
  {
    q: "Como funciona a solicitação de Aproveitamento de Estudos?",
    a: "Você deve anexar o Histórico Escolar oficial e a Ementa (Plano de Ensino) das disciplinas cursadas na instituição anterior. A coordenação do curso analisará a equivalência de carga horária e conteúdo programático."
  },
  {
    q: "Qual o procedimento para Trancamento de Matrícula?",
    a: "O trancamento pode ser solicitado dentro dos prazos estipulados no Calendário Escolar Oficial. É necessário estar em dia com a entrega da documentação de ingresso e preencher a justificativa detalhada."
  },
  {
    q: "Como agendar um atendimento presencial na Secretaria Acadêmica?",
    a: "Acesse a aba 'Agendamento Presencial' neste portal, escolha o motivo da sua visita, selecione a data e o horário disponível para gerar a sua senha de atendimento."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'new', 'schedule', 'faq'
  const [requestsList, setRequestsList] = useState(INITIAL_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedRequest, setSelectedRequest] = useState(INITIAL_REQUESTS[0]);

  // Form State para Novo Requerimento
  const [newRequestType, setNewRequestType] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('Normal');
  const [fileName, setFileName] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State para Agendamento Presencial
  const [scheduleService, setScheduleService] = useState('Retirada de Documentos');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleConfirmed, setScheduleConfirmed] = useState(null);

  // Filtragem de Requerimentos
  const filteredRequests = requestsList.filter(req => {
    const matchesSearch = req.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Criar Novo Requerimento
  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!newRequestType || !newDescription) return;

    const newReqId = `REQ-2026-0${Math.floor(100 + Math.random() * 900)}`;
    const newReq = {
      id: newReqId,
      type: newRequestType,
      category: "Secretaria Acadêmica",
      date: new Date().toLocaleDateString('pt-BR'),
      status: "Aguardando Secretaria",
      statusColor: "bg-amber-100 text-amber-800 border-amber-300",
      priority: newPriority,
      description: newDescription,
      history: [
        { 
          date: `${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}`, 
          note: "Requerimento aberto via Atendimento Online ETEC." 
        }
      ],
      downloadable: false
    };

    setRequestsList([newReq, ...requestsList]);
    setSelectedRequest(newReq);
    setSubmitSuccess(true);
    
    // Reset form
    setNewRequestType('');
    setNewDescription('');
    setFileName('');
    setNewPriority('Normal');

    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveTab('requests');
    }, 2000);
  };

  // Criar Agendamento Presencial
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!scheduleDate || !scheduleTime) return;

    const ticket = {
      protocol: `AGD-${Math.floor(1000 + Math.random() * 9000)}`,
      service: scheduleService,
      date: scheduleDate,
      time: scheduleTime,
      unit: STUDENT_DATA.unit
    };
    setScheduleConfirmed(ticket);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* topo / Header com a Marca da ETEC e Centro Paula Souza */}
      <header className="bg-[#B21F24] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo ETEC & CPS */}
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-center">
                {/* SVG Logotipo Estilizado da ETEC */}
                <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20H90V35H25V45H85V60H25V75H90V90H10V20Z" fill="#B21F24" />
                  <rect x="10" y="5" width="20" height="10" fill="#2C3E50" />
                </svg>
              </div>
              <div className="border-l border-red-400/50 pl-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-2xl tracking-wider uppercase font-mono">etec</span>
                  <span className="text-xs bg-red-800 text-white font-semibold px-2 py-0.5 rounded">SP</span>
                </div>
                <p className="text-xs text-red-100 font-medium tracking-tight">Centro Paula Souza • Governo de SP</p>
              </div>
            </div>

            {/* Menu Aluno Logado */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center gap-3 bg-red-900/40 px-3 py-1.5 rounded-full border border-red-400/30">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold leading-none">{STUDENT_DATA.name}</p>
                  <p className="text-[10px] text-red-200 mt-0.5">RM: {STUDENT_DATA.rm}</p>
                </div>
              </div>
              
              <button 
                title="Notificações"
                className="p-2 text-red-100 hover:text-white hover:bg-red-800 rounded-full transition relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-red-700"></span>
              </button>
            </div>

          </div>
        </div>

        {/* Faixa Secundária de Informação do Curso */}
        <div className="bg-[#8E171B] border-t border-red-800/60 px-4 py-2 text-xs text-red-100">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-red-300" />
              <span className="font-medium text-white">{STUDENT_DATA.course}</span>
              <span className="text-red-300">•</span>
              <span>{STUDENT_DATA.module} ({STUDENT_DATA.period})</span>
            </div>
            <div className="flex items-center gap-2 text-red-200">
              <Building2 className="w-3.5 h-3.5" />
              <span>{STUDENT_DATA.unit}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navegação por Abas */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'requests' 
                ? 'bg-[#B21F24] text-white shadow-md shadow-red-900/10' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Meus Requerimentos
          </button>

          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'new' 
                ? 'bg-[#B21F24] text-white shadow-md shadow-red-900/10' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            Novo Requerimento
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'schedule' 
                ? 'bg-[#B21F24] text-white shadow-md shadow-red-900/10' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Agendamento Presencial
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'faq' 
                ? 'bg-[#B21F24] text-white shadow-md shadow-red-900/10' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Central de Ajuda (FAQ)
          </button>
        </div>

        {/* ABA 1: MEUS REQUERIMENTOS */}
        {activeTab === 'requests' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Painel Esquerdo: Lista de Pedidos */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Barra de Filtro e Busca */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por código ou tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B21F24] focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Status:
                  </span>
                  {['Todos', 'Em Análise', 'Pronto para Retirada', 'Concluído'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap transition ${
                        statusFilter === st 
                          ? 'bg-slate-800 text-white font-medium' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista dos Requerimentos */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredRequests.length === 0 ? (
                  <div className="bg-white p-8 text-center rounded-xl border border-slate-200">
                    <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm font-medium">Nenhum requerimento encontrado.</p>
                  </div>
                ) : (
                  filteredRequests.map((req) => (
                    <div
                      key={req.id}
                      onClick={() => setSelectedRequest(req)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedRequest?.id === req.id 
                          ? 'bg-white border-[#B21F24] ring-2 ring-red-100 shadow-md' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono font-bold text-slate-500">{req.id}</span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${req.statusColor}`}>
                          {req.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-800 text-base mb-1">{req.type}</h4>
                      <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
                        <span>Aberto em: {req.date}</span>
                        <span className="flex items-center text-[#B21F24] font-medium hover:underline">
                          Ver detalhes <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Painel Direito: Detalhes do Requerimento Selecionado */}
            <div className="lg:col-span-7">
              {selectedRequest ? (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  
                  {/* Cabeçalho do Card */}
                  <div className="bg-slate-800 text-white p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                      <div>
                        <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">Protocolo {selectedRequest.id}</span>
                        <h2 className="text-xl font-bold mt-1 text-white">{selectedRequest.type}</h2>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${selectedRequest.statusColor}`}>
                        {selectedRequest.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300 border-t border-slate-700 pt-4 mt-4">
                      <div>
                        <span className="block text-slate-400">Data de Abertura:</span>
                        <span className="font-medium text-white">{selectedRequest.date}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400">Prioridade:</span>
                        <span className="font-medium text-white">{selectedRequest.priority}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400">Categoria:</span>
                        <span className="font-medium text-white">{selectedRequest.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Corpo das Informações */}
                  <div className="p-6 space-y-6">
                    
                    {/* Descrição Solicitada */}
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Descrição da Solicitação</h3>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700 leading-relaxed">
                        {selectedRequest.description}
                      </div>
                    </div>

                    {/* Botão de Download se Disponível */}
                    {selectedRequest.downloadable && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="text-sm font-semibold text-emerald-900">Documento Autenticado Disponível</p>
                            <p className="text-xs text-emerald-700">Você já pode fazer o download da versão digital com QR Code de verificação.</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm">
                          <Download className="w-4 h-4" /> Baixar PDF
                        </button>
                      </div>
                    )}

                    {/* Linha do Tempo (Timeline de Acompanhamento) */}
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Histórico do Atendimento</h3>
                      <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                        {selectedRequest.history.map((hist, index) => (
                          <div key={index} className="relative">
                            {/* Ponto na timeline */}
                            <div className="absolute -left-[31px] top-0 bg-[#B21F24] border-4 border-white w-4 h-4 rounded-full shadow"></div>
                            <div>
                              <span className="text-xs font-medium text-slate-400">{hist.date}</span>
                              <p className="text-sm font-medium text-slate-800 mt-0.5">{hist.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
                  <Info className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">Selecione um requerimento à esquerda para visualizar os detalhes.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ABA 2: NOVO REQUERIMENTO */}
        {activeTab === 'new' && (
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="border-b border-slate-200 pb-4 mb-6">
              <h2 className="text-xl font-bold text-slate-800">Abrir Novo Requerimento Acadêmico</h2>
              <p className="text-xs text-slate-500 mt-1">Preencha com atenção os campos abaixo. As solicitações são encaminhadas à Secretaria Acadêmica da ETEC.</p>
            </div>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-sm font-medium">Requerimento gerado com sucesso! Redirecionando para acompanhamento...</p>
              </div>
            )}

            <form onSubmit={handleCreateRequest} className="space-y-6">
              
              {/* Tipo de Solicitação */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tipo de Requerimento <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={newRequestType}
                  onChange={(e) => setNewRequestType(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B21F24]"
                >
                  <option value="">-- Selecione o documento / serviço --</option>
                  <option value="Declaração de Matrícula">Declaração de Matrícula (Com Frequência)</option>
                  <option value="Histórico Escolar Parcial">Histórico Escolar Parcial</option>
                  <option value="Aproveitamento de Estudos">Aproveitamento de Estudos (Dispensa de Disciplina)</option>
                  <option value="Trancamento de Matrícula">Trancamento de Matrícula</option>
                  <option value="Segunda Via de Carteirinha">Segunda Via de Carteirinha Estudantil</option>
                  <option value="Revisão de Menção / Nota">Revisão de Menção (Avaliação)</option>
                  <option value="Outros Assuntos">Outros Assuntos / Requerimento Geral</option>
                </select>
              </div>

              {/* Nível de Prioridade */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Prioridade</label>
                <div className="flex gap-4">
                  {['Baixa', 'Normal', 'Alta'].map((p) => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="priority"
                        value={p}
                        checked={newPriority === p}
                        onChange={(e) => setNewPriority(e.target.value)}
                        className="text-[#B21F24] focus:ring-[#B21F24]"
                      />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Detalhes / Justificativa */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Justificativa e Detalhes da Solicitação <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explique o motivo do seu requerimento ou forneça detalhes adicionais..."
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B21F24]"
                ></textarea>
              </div>

              {/* Anexo Simulado */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Anexar Documento Comprobatório (Opcional)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition relative">
                  <Paperclip className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-600 font-medium">Clique para selecionar ou arraste os arquivos aqui</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Formatos permitidos: PDF, PNG, JPG (Máx. 5MB)</p>
                  <input 
                    type="file" 
                    onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
                {fileName && (
                  <p className="text-xs text-emerald-700 font-medium mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Arquivo selecionado: {fileName}
                  </p>
                )}
              </div>

              {/* Envio */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('requests')}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#B21F24] hover:bg-[#8E171B] text-white text-sm font-medium flex items-center gap-2 shadow-md transition"
                >
                  <Send className="w-4 h-4" /> Enviar Requerimento
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ABA 3: AGENDAMENTO PRESENCIAL */}
        {activeTab === 'schedule' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Form de Agendamento */}
            <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Agendar Atendimento Presencial</h2>
              <p className="text-xs text-slate-500 mb-6">Evite filas na Secretaria Acadêmica agendando o seu horário de atendimento.</p>

              <form onSubmit={handleScheduleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Serviço / Assunto</label>
                  <select
                    value={scheduleService}
                    onChange={(e) => setScheduleService(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B21F24]"
                  >
                    <option value="Retirada de Documentos Físicos">Retirada de Documentos Físicos / Diplomas</option>
                    <option value="Assinatura de Contrato de Estágio">Assinatura de Contrato de Estágio (Termo de Compromisso)</option>
                    <option value="Dúvidas Sobre Rematrícula">Orientação para Rematrícula</option>
                    <option value="Atendimento com a Coordenação">Atendimento com Coordenação de Curso</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Data Atendimento</label>
                    <input
                      type="date"
                      required
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B21F24]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Horário Disponível</label>
                    <select
                      required
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B21F24]"
                    >
                      <option value="">-- Selecione o Horário --</option>
                      <option value="14:00">14:00h</option>
                      <option value="14:40">14:40h</option>
                      <option value="15:20">15:20h</option>
                      <option value="18:30">18:30h (Período Noturno)</option>
                      <option value="19:15">19:15h (Período Noturno)</option>
                      <option value="20:00">20:00h (Período Noturno)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm rounded-lg shadow transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Confirmar Agendamento Presencial
                </button>
              </form>
            </div>

            {/* Comprovante / Orientações */}
            <div className="md:col-span-5 space-y-6">
              {scheduleConfirmed ? (
                <div className="bg-white border-2 border-dashed border-[#B21F24] p-6 rounded-xl text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 bg-red-100 text-[#B21F24] rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase">Comprovante de Agendamento</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{scheduleConfirmed.protocol}</h3>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-lg text-left text-xs space-y-2 border border-slate-200">
                    <p><strong className="text-slate-700">Serviço:</strong> {scheduleConfirmed.service}</p>
                    <p><strong className="text-slate-700">Data & Hora:</strong> {scheduleConfirmed.date} às {scheduleConfirmed.time}</p>
                    <p><strong className="text-slate-700">Unidade:</strong> {scheduleConfirmed.unit}</p>
                    <p><strong className="text-slate-700">Aluno:</strong> {STUDENT_DATA.name} (RM: {STUDENT_DATA.rm})</p>
                  </div>

                  <p className="text-[11px] text-slate-500">Apresente este protocolo ou documento de identidade na chegada à Secretaria.</p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-900 space-y-3">
                  <h4 className="font-bold text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B21F24]" /> Horário de Funcionamento da Secretaria
                  </h4>
                  <ul className="text-xs space-y-2 text-red-800">
                    <li>• <strong>Manhã:</strong> 08h00 às 11h30</li>
                    <li>• <strong>Tarde:</strong> 13h30 às 17h00</li>
                    <li>• <strong>Noite:</strong> 18h30 às 21h00</li>
                  </ul>
                  <p className="text-[11px] text-red-700 pt-2 border-t border-red-200">
                    Lembre-se de comparecer com antecedência de 5 minutos trazendo um documento oficial com foto.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ABA 4: FAQ / CENTRAL DE AJUDA */}
        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Perguntas Frequentes</h2>
              <p className="text-xs text-slate-500 mt-1">Esclareça suas dúvidas sobre prazos, documentos e procedimentos acadêmicos da ETEC.</p>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition">
                  <h3 className="font-semibold text-slate-800 text-base mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-[#B21F24] flex-shrink-0 mt-0.5" />
                    {item.q}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed pl-7">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Suporte Adicional */}
            <div className="bg-slate-800 text-white rounded-xl p-6 flex flex-wrap justify-between items-center gap-4 mt-8">
              <div>
                <h4 className="font-bold text-base">Ainda tem dúvidas?</h4>
                <p className="text-xs text-slate-300 mt-0.5">Entre em contato direto com a coordenação do seu curso.</p>
              </div>
              <a
                href="mailto:secretaria.etec@cps.sp.gov.br"
                className="bg-[#B21F24] hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition"
              >
                Enviar E-mail à Secretaria
              </a>
            </div>
          </div>
        )}

      </main>

      {/* Rodapé Oficial ETEC / CPS */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <p className="font-semibold text-slate-200">ETEC - Escola Técnica Estadual | Centro Paula Souza</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Governo do Estado de São Paulo - Secretaria de Ciência, Tecnologia e Inovação</p>
          </div>
          <p className="text-[11px] text-slate-500">© 2026 Todos os direitos reservados. Sistema de Atendimento Digital ao Estudante.</p>
        </div>
      </footer>

    </div>
  );
}