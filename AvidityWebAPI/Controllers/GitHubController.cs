using AvidityWebAPI.Models;
using AvidityWebAPI.Models.ResponseCommit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace AvidityWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GitHubController : ControllerBase
    {
        private static readonly string client_id = "379e191652126f97be9a";
        private static readonly string client_secret = "9fd2d0fa6e50fd76ad4968458d599d8bcf3a55f0";
        private static readonly string access_token_url = "https://github.com/login/oauth/access_token";
        private static readonly string api_github_url = "https://api.github.com";
        private static HttpClient client;

        public GitHubController()
        {
            client = new HttpClient();
            client.DefaultRequestHeaders.UserAgent.TryParseAdd("request");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
        }

        [HttpGet]
        [Route("/accessToken/{code}")]
        public async Task<IActionResult> GetAccessToken(string code)
        {

            Dictionary<string, string> paramRequest = new Dictionary<string, string>();
            paramRequest.Add("client_id", client_id);
            paramRequest.Add("client_secret", client_secret);
            paramRequest.Add("code", code);

            var encodedContent = new FormUrlEncodedContent(paramRequest);

            var response = await client.PostAsync(access_token_url, encodedContent);
            if (response.IsSuccessStatusCode)
            {
                return Ok(await response.Content.ReadAsStringAsync());
            }

            return NotFound();
        }

        [HttpPost]
        [Route("/contributors")]
        public async Task<IActionResult> GetContributors([FromBody] Respository repo)
        {
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", repo.access_token);

            var response = await client.GetAsync($"{api_github_url}/repos/{repo.owner}/{repo.repo}/contributors");
            if (response.IsSuccessStatusCode)
            {
                var contributors = JsonConvert.DeserializeObject<List<Contributors>>(await response.Content.ReadAsStringAsync());

                var contributorsInfo = GetContributorsInfo(contributors, repo);


                return Ok(contributorsInfo);
            }

            return NoContent();
        }

        private List<ResultInfos> GetContributorsInfo(List<Contributors> contributors, Respository repo)
        {
            List<ResultInfos> infos = new List<ResultInfos>();
            foreach (var item in contributors)
            {
                var contributorInfo = GetInfos(item);
                infos.Add(new ResultInfos
                {
                    contributor = item,
                    infos = contributorInfo
                });
            }

            return infos;
        }


        public ContributorsInfo GetInfos(Contributors contributor)
        {

            var response = client.GetAsync($"{api_github_url}/repos/axios/axios/commits?author={contributor.login}").Result;

            if (response.IsSuccessStatusCode)
            {
                List<CommitInfo> result = JsonConvert.DeserializeObject<List<CommitInfo>>(response.Content.ReadAsStringAsync().Result);

                ContributorsInfo contributorInfo = new ContributorsInfo();
                contributorInfo.lastDateCommit = result.OrderByDescending(x => x.commit.committer.date).Select(x => x.commit.committer.date).First();
                contributorInfo.firstDateCommit = result.OrderBy(x => x.commit.committer.date).Select(x => x.commit.committer.date).First();
                return contributorInfo;
            }

            return null;
        }
    }
}
