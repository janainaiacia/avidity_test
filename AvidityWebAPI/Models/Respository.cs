﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvidityWebAPI.Models
{
    public class Respository
    {
        public string access_token { get; set; }

        public string token_type { get; set; }

        public string owner { get; set; }

        public string repo { get; set; }
    }
}
