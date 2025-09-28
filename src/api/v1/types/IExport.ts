export interface IExport {
  id: string;
  countryId: string;
  code: string;
  volume: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Optional date filters for dashboard
  startDate?: Date; 
  endDate?: Date;
}
