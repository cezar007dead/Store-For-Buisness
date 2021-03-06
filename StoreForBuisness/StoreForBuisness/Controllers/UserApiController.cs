﻿using Microsoft.AspNet.Identity;
using StoreForBuisness.Models.Domain;
using StoreForBuisness.Models.Request;
using StoreForBuisness.Models.Request.Users;
using StoreForBuisness.Models.Resposne;
using StoreForBuisness.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace StoreForBuisness.Controllers
{

    [RoutePrefix("api/users")]
    public class UserApiController : ApiController
    {
        IUserService _userService;
        IJwtAuthService _authService;

        public UserApiController(IUserService userService, IJwtAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        [AllowAnonymous]
        [Route("register"), HttpPost]
        public HttpResponseMessage Register(AddUserRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            _userService.AddUser(model);
            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [Route("login"), HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage LogIn(UserLogInRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            bool isSuccessful = _userService.LogIn(model);
            var status = HttpStatusCode.BadRequest;
            if (isSuccessful)
            {
                status = HttpStatusCode.OK;
            }
            return Request.CreateResponse(status, isSuccessful);
        }

        [Route("logout"), HttpPost]
        [Authorize]
        public HttpResponseMessage Logout()
        {
            _userService.LogOut();
            var status = HttpStatusCode.OK;

            return Request.CreateResponse(status);
        }

        [AllowAnonymous]
        [Route("current"), HttpGet]
        public HttpResponseMessage Current()
        {
            var user = _authService.GetCurrentUser();
            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            }
            return Request.CreateResponse(HttpStatusCode.OK, user);
        }


        [AllowAnonymous]
        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            ItemResponse<User> response = new ItemResponse<User>();
            response.Item = _userService.GetById(id);
            if (response.Item == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            }
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        //[Route, HttpPost]
        //public HttpResponseMessage Add(AddUserRequest model)
        //{

        //    if (!ModelState.IsValid)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        //    }
        //    int Id = _service.AddUser(model);
        //    return Request.CreateResponse(HttpStatusCode.OK, Id);
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        _authService.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        //private IHttpActionResult GetErrorResult(IdentityResult result)
        //{
        //    if (result == null)
        //    {
        //        return InternalServerError();
        //    }
        //    if (!result.Succeeded)
        //    {
        //        if (result.Errors != null)
        //        {
        //            foreach (string error in result.Errors)
        //            {
        //                ModelState.AddModelError("", error);
        //            }
        //        }
        //        if (ModelState.IsValid)
        //        {
        //            return BadRequest();
        //        }
        //        return BadRequest(ModelState);
        //    }
        //    return null;
        //}
    }
}
