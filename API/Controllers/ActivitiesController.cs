using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController(AppDbContext context) : BaseApiController
    {
        //we want to return an http result so we use an actionresult
        [HttpGet(Name = "GetActivities")]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await context.Activities.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetail(string id)
        {
            var activityDetail = await context.Activities.FindAsync(id);
            if (activityDetail == null) return BadRequest();
            return activityDetail;
        }
    }
}