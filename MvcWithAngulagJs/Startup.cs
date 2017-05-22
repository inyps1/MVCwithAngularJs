using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MvcWithAngulagJs.Startup))]
namespace MvcWithAngulagJs
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
