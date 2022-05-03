using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extention
{
    public static class ClaimsPrincipleExtentions
    {
        public static string GetUSerName(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }
        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse( user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }

    }
}