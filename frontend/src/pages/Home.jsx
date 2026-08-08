import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="page home-page">
      <div className="hero-card">
        <p className="eyebrow">Agendamento online</p>
        <h1>Agende seu atendimento de forma simples</h1>
        <p className="lead">
          Escolha o serviço, informe seus dados, selecione data e horário disponível e
          confirme sua reserva em poucos passos.
        </p>
        <div className="hero-actions">
          <Link to="/agendamento" className="btn btn-primary">
            Fazer agendamento
          </Link>
        </div>
        <ul className="info-list">
          <li>Atendimento de segunda a sexta, das 08:00 às 17:30</li>
          <li>Confirmação imediata após o envio</li>
          <li>Sem necessidade de cadastro ou login</li>
        </ul>
      </div>
    </section>
  );
}
