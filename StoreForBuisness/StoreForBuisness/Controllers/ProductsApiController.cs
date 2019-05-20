using StoreForBuisness.Interfaces;
using StoreForBuisness.Models.Domain;
using StoreForBuisness.Models.ProjectModals;
using StoreForBuisness.Models.Request.Products;
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
    [RoutePrefix("api/products")]
    public class ProductsApiController : ApiController
    {
        IProductService _service;
        IJwtAuthService _authService;

        public ProductsApiController(IProductService userService, IJwtAuthService authService)
        {
            _service = userService;
            _authService = authService;
        }


        [Route(), HttpPost]
        public HttpResponseMessage Add(ProductAddRequest model)
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

        [Route(), HttpPut]
        public HttpResponseMessage Update(ProductUpdateRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Modal is not Valid");
            }
            ItemResponse<string> responseBody = new ItemResponse<string>();
            responseBody.Item = "Succsess";
            _service.Update(model);
            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {

            ItemResponse<string> responseBody = new ItemResponse<string>();
            _service.Delete(id);
            responseBody.Item = "Succsess";

            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }

        [Route("{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage GetByPageIndexPageSize(int pageIndex, int pageSize)
        {

            ItemResponse<Paged<Product>> responseBody = new ItemResponse<Paged<Product>>();
            responseBody.Item = _service.SellectByPage(pageIndex, pageSize);
            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }

        [Route("{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage GetByPageIndexPageSizeSearch(int pageIndex, int pageSize, string query)
        {
            ItemResponse<Paged<Product>> responseBody = new ItemResponse<Paged<Product>>();
            responseBody.Item = _service.SellectByPageSearch(pageIndex, pageSize, query);
            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {

            ItemResponse<Product> responseBody = new ItemResponse<Product>();
            responseBody.Item = _service.SellectById(id);

            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }
        [Route("userId/{userId:int}"), HttpGet]
        public HttpResponseMessage GetByUserId(int userId)
        {
            ItemResponse<List<Product>> responseBody = new ItemResponse<List<Product>>();
            responseBody.Item = _service.SellectByUserId(userId);

            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }
    }
}
