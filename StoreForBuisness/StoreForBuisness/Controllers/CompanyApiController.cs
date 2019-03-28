using StoreForBuisness.Interfaces;
using StoreForBuisness.Models.Domain;
using StoreForBuisness.Models.Request.Company;
using StoreForBuisness.Models.Resposne;
using StoreForBuisness.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StoreForBuisness.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/company")]
    public class CompanyApiController : ApiController
    {
        ICompanyService _service;
        IJwtAuthService _authService;

        public CompanyApiController(ICompanyService userService, IJwtAuthService authService)
        {
            _service = userService;
            _authService = authService;
        }


        [Route(), HttpPost]
        public HttpResponseMessage Add(CompanyAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Modal is not Valid");
            }
            ItemResponse<int> responseBody = new ItemResponse<int>();
            UserBase user = _authService.GetCurrentUser();
            int userId = user.Id;
            responseBody.Item = _service.Insert(model, userId);
            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }

        [Route("user/{id:int}"), HttpGet]
        public HttpResponseMessage GetByUserId(int id)
        {

            ItemResponse<List<Company>> responseBody = new ItemResponse<List<Company>>();
            responseBody.Item = _service.SellectByUserId(id);

            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {

            ItemResponse<Company> responseBody = new ItemResponse<Company>();
            responseBody.Item = _service.SellectById(id);

            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }
    }
}
