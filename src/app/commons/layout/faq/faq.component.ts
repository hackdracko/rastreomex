import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  faqs = [
    {
      question: '¿Qué es el rastreo satelital GPS y cómo funciona?',
      answer: 'El rastreo satelital GPS usa un dispositivo instalado en el vehículo que se comunica con satélites y redes celulares para reportar su ubicación en tiempo real. Puedes ver la posición, rutas recorridas y recibir alertas desde una plataforma web o app móvil.'
    },
    {
      question: '¿Cuánto cuesta un rastreador GPS en México con Rastreomex?',
      answer: 'El Plan Tradicional para autos y motos particulares tiene un costo de $4,200 MXN. Para flotillas empresariales (Plan Empresarial) y flotas de vehículos pesados (Plan Avanzado) la cotización se ajusta al número de unidades, por lo que se maneja precio personalizado.'
    },
    {
      question: '¿Rastreomex da servicio para motos, autos y tráileres?',
      answer: 'Sí. Ofrecemos rastreo GPS para autos y motos particulares, así como soluciones de flotillas para empresas con camionetas, tráileres y vehículos pesados.'
    },
    {
      question: '¿El monitoreo y soporte técnico son las 24 horas?',
      answer: 'El rastreo y la ubicación en tiempo real están disponibles las 24 horas, los 7 días de la semana. El soporte técnico con asesores atiende en horario laboral para resolver dudas e incidencias.'
    },
    {
      question: '¿Qué incluye una geocerca en el rastreo GPS?',
      answer: 'Una geocerca es un perímetro virtual que defines en el mapa. Si el vehículo entra o sale de esa zona, la plataforma envía una alerta automática, útil para control de rutas y seguridad.'
    }
  ];

}
