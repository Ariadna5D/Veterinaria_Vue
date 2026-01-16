import { createI18n } from 'vue-i18n';

//aqui definimos las traducciones
const messages = {
  es: {
    titulo: 'Clínica Veterinaria',
    btn_idioma: 'Español',
    tabs: {
      pacientes: 'Pacientes',
      nuevo: 'Ingreso',
      servicios: 'Adopción',
      contacto: 'Contacto',
      stats: 'Estadísticas'
    },
    pacientes:{
      titulo: 'Pacientes',
      buscar: 'Buscar...',
      campos:{
        nombre: 'Paciente',
        especie: 'Especie',
        dueno: 'Dueño',
        tipo: 'Tipo',
        telefono: 'Teléfono'
      },
      ficha:{
        titulo: 'Ficha de ',
        notas: 'Notas',
      }
    },
    ingreso:{
      titulo: 'Registro Animal',
      errores: {
        nomReq: 'El nombre es obligatorio',
        espReq: 'Selecciona una especie',
        dueReq: 'El dueño es obligatorio',
        num9: 'Debe tener 9 dígitos',
        tipoReq: 'El tipo/raza es obligatorio', 
        fechaReq: 'La fecha de nacimiento es obligatoria', 
        emailReq: 'El email es obligatorio', 
        emailInv: 'Formato de email no válido' 
      },
      formulario: {
        accion: 'Registrar',
        exito: 'Paciente guardado con éxito',
        seleccionar: 'Selecciona',
        campos: {
          tNombreMascota: 'Nombre Mascota',
          tEspecie: 'Especie',
          tTipo: 'Tipo/Raza', 
          tFechaNacimiento: 'Fecha de Nacimiento', 
          tDueno: 'Dueño',
          tEmail: 'Correo Electrónico', 
          tTelefono: 'Teléfono',
          tNotas: 'Notas'
        }
      }
    },
    contacto:{
      errores: {
        formato: "Formato inválido (ej: a{'@'}b.com)",
        longitud: 'Mínimo 5 caracteres',
        telefono: 'Debe tener 9 dígitos numéricos', 
        cp: 'Código postal inválido (5 dígitos)',
        nombre: 'El nombre debe tener al menos 3 caracteres', 
        asunto: 'El asunto es obligatorio' 
      },
      formulario:{
        exito: 'Mensaje enviado',
        titulo: 'Contacto Rápido',
        campoNombre: 'Nombre Completo', 
        campoMail: 'Tu Email',
        campoTelefono: 'Teléfono',      
        campoCP: 'Código Postal',       
        campoAsunto: 'Asunto de la consulta', 
        campoConsulta: 'Consulta',
        accion: 'Enviar Consulta'
      },
      urgencias: {                      
        titulo: '¿Emergencia Veterinaria?',
        texto: 'Llámanos inmediatamente al'
      }
    },
    stats:{
      titulo: 'Pacientes de la clínica',
      grafico: 'Seleccionar tipo de gráfico',
    },
    especies: {
      perro: 'Perro',
      gato: 'Gato',
      ave: 'Ave',
      reptil: 'Reptil',
      roedor: 'Roedor',
      otro: 'Otro'
    }
  },

  en: {
    titulo: 'Veterinary Clinic',
    btn_idioma: 'English',
    tabs: {
      pacientes: 'Patients',
      nuevo: 'Admission',
      servicios: 'Adoption',
      contacto: 'Contact',
      stats: 'Stats'
    },
    pacientes:{
      titulo: 'Patients',
      buscar: 'Search...',
      campos:{
        nombre: 'Patient',
        especie: 'Species', 
        dueno: 'Owner',
        tipo: 'Type',
        telefono: 'Phone'
      },
      ficha:{
        titulo: 'Record of ', 
        notas: 'Notes',
      }
    },
    ingreso:{
      titulo: 'Animal Registration', 
      errores: {
        nomReq: 'The name is required',
        espReq: 'Select a species', 
        dueReq: 'Owner required',
        num9: 'Must be 9 digits',
        tipoReq: 'Type/Breed is required', 
        fechaReq: 'Date of birth is required', 
        emailReq: 'Email is required', 
        emailInv: 'Invalid email format' 
      },
      formulario: {
        accion: 'Register',
        exito: 'Patient registered successfully',
        seleccionar: 'Select',
        campos: {
          tNombreMascota: 'Pet Name',
          tEspecie: 'Species',
          tTipo: 'Type/Breed', 
          tFechaNacimiento: 'Date of Birth', 
          tDueno: 'Owner',
          tEmail: 'Email Address', 
          tTelefono: 'Phone Number',
          tNotas: 'Notes'
        }
      }
    },
    contacto:{
      errores: {
        formato: "Invalid format (ex: a{'@'}b.com)",
        longitud: 'Must be 5 characters min',
        telefono: 'Must be 9 numeric digits',    
        cp: 'Invalid postal code (5 digits)',
        nombre: 'Name must be at least 3 characters', 
        asunto: 'Subject is required' 
      },
      formulario:{
        exito: 'Message Sent',
        titulo: 'Quick Contact',
        campoNombre: 'Full Name', 
        campoMail: 'Your Email',
        campoTelefono: 'Phone',         
        campoCP: 'Postal Code',         
        campoAsunto: 'Subject', 
        campoConsulta: 'Enquiry',
        accion: 'Send Enquiry'
      },
      urgencias: {                      
        titulo: 'Veterinary Emergency?',
        texto: 'Call us immediately at'
      }
    },
    servicios:{
      titulo: 'Adoption'
    },
    stats:{
      titulo: 'Clinic Patients',
      grafico: 'Select a Graph'
    },
    especies: {
      perro: 'Dog',
      gato: 'Cat',
      ave: 'Bird',
      reptil: 'Reptile',
      roedor: 'Rodent',
      otro: 'Other'
    }
  }
};

export default createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages
});