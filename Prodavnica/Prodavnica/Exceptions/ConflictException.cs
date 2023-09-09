using Microsoft.AspNetCore.Mvc;

namespace Prodavnica.Exceptions
{
	public class ConflictException : Exception
	{
		public ConflictException()
		{
		}

		public ConflictException(string message) : base(message)
		{
		}

		public IActionResult ToActionResult()
		{
			var problemDetails = new ProblemDetails
			{
				Status = 409,
				Title = "Conflict",
				Detail = Message
			};
			return new ObjectResult(problemDetails)
			{
				StatusCode = problemDetails.Status
			};
		}
	}
}
