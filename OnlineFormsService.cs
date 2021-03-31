namespace Terrasoft.Configuration
{
    using Terrasoft.Web.Common;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using System;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.DB;
    using System.Collections.Generic;
    //using Newtonsoft.Json;
    using System.Net;
    using System.IO;
    //JsonConvert.DeserializeObject<SheetData>(response);
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    class OnlineFormsService : BaseService
    {
        private Uri ScriptUrl;
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public bool GetNewGoogleFormLink(string jsonParameters)
        {
            string url = Core.Configuration.SysSettings.GetValue(UserConnection, "CgrGoogleFormScriptUrl").ToString();
            ScriptUrl = new Uri(url + "?jsonString=" + jsonParameters);
            string response = TryDownloadString(ScriptUrl);

            EntitySchema schema = UserConnection.EntitySchemaManager.GetInstanceByName("CgrQuestionnaires");
            EntitySchemaQuery esq = new EntitySchemaQuery(schema);
            esq.AddAllSchemaColumns();
            EntityCollection entities = esq.GetEntityCollection(UserConnection);
            entities[0].SetColumnValue("CgrFormLink", response);
            entities[0].Save();
            
            return true;
        }

        private string TryDownloadString(Uri requestUrl)
        {
            var webClient = new WebClient
            {
                Encoding = System.Text.Encoding.UTF8
            };
            try
            {
                return webClient.DownloadString(requestUrl);
            }
            catch (WebException)
            {
                return false.ToString();
            }
        }

    }
}


