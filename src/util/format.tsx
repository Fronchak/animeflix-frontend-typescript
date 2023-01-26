export const formatNota = (nota: number): string => {
  const nf = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  return nf.format(nota);
}
