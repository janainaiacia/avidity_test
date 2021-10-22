using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvidityWebAPI.Models.ResponseCommit
{
    public class Committer
    {
        public DateTime date { get; set; }
        public string name { get; set; }
        public string email { get; set; }

    }
}
