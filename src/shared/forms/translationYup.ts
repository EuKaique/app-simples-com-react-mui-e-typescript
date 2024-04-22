import { setLocale } from 'yup';

setLocale({
    mixed: {
        default: 'Não é válido',
        required: 'Campo obrigatório',
        oneOf: ({ values }) => `Deve ser um dos seguintes valores: ${values}`,
        notOneOf: ({ values }) => `Não pode ser um dos seguintes valores: ${values}`,
        notType: ({ type, value, originalValue }) => {
          const isCast = originalValue != null && originalValue !== value;
          let msg = `${type === 'number' && isCast ? 'Número inválido' : 'Formato não é válido'}`;
          return msg;
        },
      },
      string: {
        length: ({ length }) => `Deve ter exatamente ${length} caracteres`,
        min: ({ min }) => `Deve ter pelo menos ${min} caracteres`,
        max: ({ max }) =>  `Deve ter no máximo ${max} caracteres`,
        email: 'Deve ser um e-mail válido',
        url: 'Deve ser uma URL válida',
        trim: 'Não deve incluir espaços no início ou no fim',
        lowercase: 'Deve estar em minúsculo',
        uppercase: 'Deve estar em maiúsculo',
      },
      number: {
        min: ({ min }) => `Deve ser maior ou igual a ${min}`,
        max: ({ max }) => `Deve ser menor ou igual a ${max}`,
        lessThan: ({ less }) => `Deve ser menor que ${less}`,
        moreThan: ({ more }) => `Deve ser maior que ${more}`,
        positive: 'Deve ser um número positivo',
        negative: 'Deve ser um número negativo',
        integer: 'Deve ser um número inteiro',
      },
      date: {
        min: ({ min }) => `Deve ser posterior a ${min}`,
        max: ({ max }) => `Deve ser anterior a ${max}`,
      },
      boolean: {
        isValue: ({ value }) => `Deve ser ${value}`,
      },
      object: {
        noUnknown: 'Tem campos não especificados no esquema',
      },
      array: {
        min:  ({ min }) => `Deve ter pelo menos ${min} itens`,
        max: ({ max }) => `Deve ter no máximo ${max} itens`,
      },
})