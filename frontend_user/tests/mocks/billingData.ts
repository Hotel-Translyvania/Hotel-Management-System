export type BillingItemType = {
    id: string;
    description: string;
    category: string;
    amount: number;
    tax: number;
  };
  
  export type BillingHistoryType = {
    id: string;
    date: string;
    status: 'paid' | 'pending' | 'unpaid'; // You can expand this union if needed
    total: number;
    items: BillingItemType[];
  };
  
  export const mockBillingHistory: BillingHistoryType[] = [
    {
      id: 'INV-002',
      date: '2024-04-01',
      status: 'paid',
      total: 230.0,
      items: [
        { id: '1', description: 'Room Charge', category: 'room', amount: 200, tax: 30 }
      ]
    },
    {
      id: 'INV-003',
      date: '2024-03-15',
      status: 'pending',
      total: 150.0,
      items: [
        { id: '2', description: 'Laundry Service', category: 'services', amount: 120, tax: 30 }
      ]
    }
  ];
  