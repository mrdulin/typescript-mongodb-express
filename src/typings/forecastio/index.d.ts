declare module 'forecastio' {
  interface ForecastIo {
    new(apiKey: string, requestOptions?: any): any;
  }

  const ForecastIo: ForecastIo;

  export = ForecastIo;
}

