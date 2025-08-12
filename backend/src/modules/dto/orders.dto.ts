export interface PartOrderDTO {
  partId: string;
  quantidade: number;
  unidade: string;
  statusItem: 'OP' | 'ESTOQUE';
  precoUnitario?: number;
}

export interface OrderDTO {
  numeroPedido: string;
  customerId: string;
  emissao: Date;
  prazoEntrega?: Date;
  status: 'OK' | 'PENDENTE' | 'CANCELADO';
  valorTotal: number;
  observacoes?: string;
  marca: string;
  itens: PartOrderDTO[];
}