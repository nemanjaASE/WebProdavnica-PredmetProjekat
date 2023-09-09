using Prodavnica.Dto;

namespace Prodavnica.Interfaces.IService
{
	public interface IAuthService
	{
		Task<string> Login(LoginDTO loginDto);
		Task<string> GoogleLogin(string token);
	}
}
