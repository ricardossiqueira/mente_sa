interface ICreateSessionDTO {
  professionalId: string;
  pacientId: string;
  scheduleDate: Date;
  sessionTheme: string;
  sessionType: string;
  duration: number;
}

export { ICreateSessionDTO };
