using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvidityWebAPI.Models.ResponseCommit
{
    public class Commit
    {
        public string url { get; set; }
        public Author author { get; set; }
        public Committer committer { get; set; }
    }
}
