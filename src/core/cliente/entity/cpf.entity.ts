
export class Cpf {
  static validaCpf(cpf: string) {
    cpf = cpf.replace(/[^\d]/g, '');

    let soma = 0;
    if (cpf === undefined) {
      return false;
    }

    const allOneNumber = /^(.)\1*$/.test(cpf)
    if (allOneNumber || cpf.length !== 11) return false;

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    let resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;
    for (let k = 1; k <= 10; k++) {
      soma = soma + parseInt(cpf.substring(k - 1, k)) * (12 - k)
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }
}