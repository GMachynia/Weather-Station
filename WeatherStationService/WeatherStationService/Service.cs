using System;
using Topshelf;
using System.Net.Http;
using System.Threading.Tasks;
using WeatherStationService.Entities;


namespace WeatherStation_Service
{
     public static class Extend
    {
        public static DateTime Truncate(this DateTime dateTime, TimeSpan timeSpan)
        {
            if (timeSpan == TimeSpan.Zero) return dateTime; // Or could throw an ArgumentException
            if (dateTime == DateTime.MinValue || dateTime == DateTime.MaxValue) return dateTime; // do not modify "guard" values
            return dateTime.AddTicks(-(dateTime.Ticks % timeSpan.Ticks));
        }
    }
    class Measurement
    {
        public float Temperature { get; set; }
        public float Pressure { get; set; }
        public float Humadity { get; set; }
        public float Altitude { get; set; }
    }
    class ServiceMethods
    {
        private readonly MeasurementRepository measurementsRepository;
        private readonly System.Timers.Timer timer;
        private readonly HttpClient client;


        public ServiceMethods()
        {
            client = new HttpClient();
            measurementsRepository = new MeasurementRepository();
            timer = new System.Timers.Timer();
            timer.Elapsed += async (_, __) =>await GetMeasurementAndAddToDbAsync();
            timer.Interval = 10000;
            timer.Enabled = true;
        }
        public void Start()
        {
            timer.Start();
        }
        public void Stop()
        {
            timer.Stop();
        }

        private async Task GetMeasurementAndAddToDbAsync()
        {
            var measurement = await GetMeasurementAsync(client);
            var measurementModel = new MeasurementModel()
            {
                DateTime = DateTime.Now.Truncate(TimeSpan.FromSeconds(1)),
                Moisture = measurement.Humadity,
                Pressure = measurement.Pressure,
                Temperature = measurement.Temperature,
                Altitude=measurement.Altitude               
            };
            await measurementsRepository.AddToDbAsync(measurementModel);
        }

        private async Task<Measurement> GetMeasurementAsync(HttpClient client)
        {
            var result = await client.GetAsync("http://192.168.4.1/measurement");
            return await result.Content.ReadAsAsync<Measurement>();
        }


    }
    class Service
    {
        static void Main(string[] args)
        {
            HostFactory.Run(x =>
            {
                x.Service<ServiceMethods>(service =>
                {
                    service.ConstructUsing(s => new ServiceMethods());
                    service.WhenStarted(s => s.Start());
                    service.WhenStopped(s => s.Stop());
                    service.WhenShutdown(s => s.Stop());

                });
                x.StartAutomatically();
                x.RunAsLocalSystem();
                x.SetServiceName("WeatherStation_Service");
                x.SetDisplayName("WeatherStation_Service");
            }
            );
        }
    }


}

