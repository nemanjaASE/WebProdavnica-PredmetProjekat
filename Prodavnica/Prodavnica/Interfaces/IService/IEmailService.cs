namespace Prodavnica.Interfaces.IService
{
	public interface IEmailService
	{
		Task SendEmail(string email, string verifikacija);
	}
}
