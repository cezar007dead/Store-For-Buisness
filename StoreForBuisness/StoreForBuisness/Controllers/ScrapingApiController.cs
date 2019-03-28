using AngleSharp.Html.Parser;
using StoreForBuisness.Models.Resposne;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StoreForBuisness.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/scraping")]
    public class ScrapingApiController : ApiController
    {
        [Route(), HttpGet]
        public HttpResponseMessage Scrape()
        {
            string url = "https://corporate.findlaw.com/litigation-disputes/u-s-import-requirements.html";
            var client = new WebClient();


            //client.UseDefaultCredentials = true;
            //client.Proxy.Credentials = System.Net.CredentialCache.DefaultCredentials;
            var html = client.DownloadString(url);
            var aliexpress = client.DownloadString("https://www.amazon.com/");
            var parser = new HtmlParser();
            var document = parser.ParseDocument(html);
            var siteTable = document.QuerySelector("#innerleftpane");
            siteTable = siteTable.QuerySelector(".articleText");
            siteTable = siteTable.QuerySelector(".text");

            ItemResponse<string> responseBody = new ItemResponse<string>();
            responseBody.Item = siteTable.InnerHtml;
            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }

        [Route("aliexpress"), HttpGet]
        public HttpResponseMessage ScrapeAliexpres(string query)
        {
            //string url = "https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20190305113841&SearchText=" + query;
            //string url = "https://www.amazon.com/s?k=" + query + "&ref=nb_sb_noss";
            //string url = "https://www.rakuten.com/search/all.htm?query=&position=submit&type=suggest&store_name=" + query;
            //string url = "https://www.dns-shop.ru/search/?q=" + query;
            //string url = "https://www.bestbuy.com/site/searchpage.jsp?st=" + query + "&_dyncharset=UTF-8&id=pcat17071&type=page&sc=Global&cp=1&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All+Categories&ks=960&keys=keys";
            string url = "https://slickdeals.net/newsearch.php?src=SearchBarV2&q=" + query + "&pp=20&forumid%5B%5D=25&forumid%5B%5D=9&forumid%5B%5D=30&forumid%5B%5D=53&forumid%5B%5D=38&forumid%5B%5D=54&forumid%5B%5D=4&forumid%5B%5D=39&forumid%5B%5D=10&forumid%5B%5D=8&forumid%5B%5D=13";
            var client = new WebClient();

            var html = client.DownloadString(url);
            var parser = new HtmlParser();
            var document = parser.ParseDocument(html);
            //var siteTable = document.QuerySelector("#hs-list-items");  // aliexpress
            //var siteTable = document.QuerySelector(".sg-col-inner");      //amazon
            //var siteTable = document.QuerySelector(".blk main blk1 frt col-last");  //rakuten
            //var siteTable = document.QuerySelector("#search-results");  //dnsshop
            //var siteTable = document.QuerySelector(".shop-sku-list");     //bestbuy
            var siteTable = document.QuerySelector(".mainSearchContent");  // slickdeals
            ItemResponse<string> responseBody = new ItemResponse<string>();
            responseBody.Item = siteTable.InnerHtml;
            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }
    }
}
