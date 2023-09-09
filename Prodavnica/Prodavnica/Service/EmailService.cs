using MimeKit;
using Prodavnica.Interfaces.IService;
using System.Net.Mail;
using MailKit.Security;
using MailKit.Net.Smtp;
using Org.BouncyCastle.Asn1.Pkcs;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace Prodavnica.Service
{
	public class EmailService : IEmailService
	{
		private readonly IConfiguration _configuration;

		public EmailService(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public async Task SendEmail(string email, string verifikacija)
		{
			string tekst = $"Vasa verifikacija za WEB PRODAVNICU je: {verifikacija}";

			var mail = new MimeMessage
			{
				Subject = "Verifikacija",
				Body = new TextPart(MimeKit.Text.TextFormat.Plain) { Text = tekst }
			};


			mail.From.Add(new MailboxAddress(_configuration["MailSettings:DisplayName"], _configuration["MailSettings:From"]));

			mail.To.Add(MailboxAddress.Parse(email));

            SmtpClient smtp = new SmtpClient();

			await smtp.ConnectAsync(_configuration["MailSettings:Host"], 
									int.Parse(_configuration["MailSettings:Port"]!), 
									SecureSocketOptions.Auto);

			string s = _configuration["MailSettings:From"] + " " + _configuration["MailSettings:Password"];

			await smtp.AuthenticateAsync(_configuration["MailSettings:From"], _configuration["MailSettings:Password"]);

			await smtp.SendAsync(mail);

			await smtp.DisconnectAsync(true);
		}
	}
}
