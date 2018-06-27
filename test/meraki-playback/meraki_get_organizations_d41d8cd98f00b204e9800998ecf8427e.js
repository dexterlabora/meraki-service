const path = require('path')

// GET /login/dashboard_login?go=/organizations&sh=57

// accept: application/json, text/plain, */*
// content-type: application/json
// user-agent: axios/0.18.0
// connection: close
// host: n57.meraki.com

module.exports = function (req, res) {
  res.statusCode = 200

  res.setHeader('server', 'nginx')
  res.setHeader('date', 'Sat, 12 May 2018 21:35:40 GMT')
  res.setHeader('content-type', 'text/html; charset=utf-8')
  res.setHeader('transfer-encoding', 'chunked')
  res.setHeader('connection', 'close')
  res.setHeader('vary', 'Accept-Encoding')
  res.setHeader('x-frame-options', 'sameorigin')
  res.setHeader('content-security-policy', 'default-src \'self\' data: https://*.typekit.net https://*.typekit.com https://csi.gstatic.com https://www.google.com https://captcha.guard.qcloud.com https://captcha.gtimg.com;  style-src \'self\' \'unsafe-inline\' https://use.typekit.com https://captcha.gtimg.com;  script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https://use.typekit.com/ https://maps.googleapis.com https://www.google.com https://www.gstatic.com https://captcha.guard.qcloud.com https://captcha.gtimg.com; report-uri https://merakilogindev.report-uri.io/r/default/csp/enforce')
  res.setHeader('x-ua-compatible', 'IE=Edge,chrome=1')
  res.setHeader('etag', '"e51448bd81be26100e3121677be679ae"')
  res.setHeader('cache-control', 'max-age=0, private, must-revalidate')
  res.setHeader('set-cookie', '_session_id_for_n57=31a4ddcde048611ccc21b40a55da4570; path=/; secure; HttpOnly')
  res.setHeader('x-request-id', '41b915f198e8f33b13da548c9fafb670')
  res.setHeader('x-runtime', '0.029564')
  res.setHeader('x-rack-cache', 'miss')
  res.setHeader('strict-transport-security', 'max-age=15552000; includeSubDomains')

  res.setHeader('x-node-vcr-tape', path.basename(__filename, '.js'))

  res.write(Buffer.from(`
<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title>Meraki Dashboard Login</title>
  <meta name="description" content="Networks that simply work">
  <meta name="author" content="Meraki, Inc.">
    <link rel="Shortcut Icon" href="/favicon.ico?1454376951" type="image/x-icon" />
  <script src="/javascripts/jquery-1.8.3.min.js?mtime=1524708503" type="text/javascript"></script>
  <script src="/javascripts/jquery.cookie.min.js?mtime=1516130200" type="text/javascript"></script>
  <script src="/javascripts/modernizr.min.js?mtime=1524708514" type="text/javascript"></script>
  <link href="/stylesheets/normalize.min.css?1454376949" media="all" rel="stylesheet" type="text/css" />
  <link href="/stylesheets/minified/dashboard_login.css?1523470956" media="all" rel="stylesheet" type="text/css" />
  <link href="/stylesheets/minified/login_promo.css?1505408788" media="all" rel="stylesheet" type="text/css" />

  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/> <!--320-->
</head>

<body>

<div id="container">

  <header id="masthead">
    <div id="masthead-content">
      <a href="https://meraki.cisco.com/"><img alt="Cisco Meraki" src="/images/cisco-meraki.png?1454376949" width="165" /></a>
    </div>
  </header>

  <div id="content" role="main">

    <!--[if lte IE 8 ]>
    <div style="border: 1px solid rgb(204,153,153); padding: 0.5em; background-color: rgb(204,0,0); color: rgb(255,255,255); margin-right: 10px; width:945px;">
      <div style='padding-top:0.5em'>
        Some features of Meraki Dashboard require a <a href="www.browsehappy.com" rel="noopener noreferrer" target="_blank">newer browser</a>.
      </div>
    </div><br />
    <![endif]-->

    <div id="login-box" class="clearfix">
      <h1>Dashboard Login</h1>

      <div id="login_form" class="formarea shortform clearfix">
        <noscript>
 <div id="javascript_failure_container" class="notice_explanation_container">
  <div class="notice_explanation bad">Your browser must have Javascript enabled to use Dashboard.</div>
 </div>
 <div style='clear:both'>&nbsp;</div>
</noscript>

<style>
  #cookie_failure_container {
    display: none;
  }

  html.no-cookies #cookie_failure_container {
    display: block;
  }
</style>
<div id="cookie_failure_container">
  <div class="notice_explanation_container">
    <div class="notice_explanation bad">Your browser must have cookies enabled to use Dashboard.</div>
  </div>
</div>


        

        <form accept-charset="UTF-8" action="/login/login" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="zksjHROJCSk3ozHBPpXUZzvwHkKmz9VOJMe/V+Za8+Q=" /></div> 

          <label id="label_for_email">
            <span>Email</span>
            <input class="txt_inpt" id="email" maxlength="128" name="email" type="email" />
          </label>

          <label id="pass">
            <span>Password</span>
            <input autocomplete="off" class="txt_inpt jsAnalyticsExclude" id="password" name="password" type="password" value="" />
          </label>


          <div id="formarea-buttons">
            <input id="commit" type="submit" name="commit" value="Log in" />
            <label id="remember">
              <input id="remember_user" name="remember_user" style="vertical-align:middle" type="checkbox" value="1" />
              <span style="vertical-align:middle; margin-left: 5px;">Stay logged in</span>
            </label>

            <input type="hidden" name="goto" value="manage" /><input type="hidden" name="go" value="/organizations" /><input type="hidden" name="sh" value="57" />
        </div>
        </form>
        <div id="formarea-bottom" class="clearfix">
          <ul>
            <li><a href="https://n57.meraki.com/login/reset_password">I forgot my password</a></li>
            <li><a href="https://n57.meraki.com/login/signup">Create an account</a></li>
          </ul>
        </div>
      </div> <!-- /.formarea -->
    </div>

    



<div id="promo-box" class="column"><a href="https://meraki.cisco.com/products/wireless#mr-new">
  <div classname="promo-item new_mr">
    <img src="/images/dashboard_promo/new_mr.jpg" width="614" alt="New Meraki MR models" />
  </div>
</a></div>

  <div id="promo-banner">
      <a id="app-link" href="https://itunes.apple.com/us/app/meraki/id693056161?mt=8" target="itunes_store">
      <img src="/images/mobile-app-icon.png" alt="Mobile app icon"><span>Monitor on the go with the Meraki App</span></a>
    </a>
  </div>

  </div> <!-- /#content -->

  <footer id='footer'>
    <div id='footerLeft'>
      <div id='copyright'>
        <a class='DashboardLoginPage__footerLink' href='http://www.meraki.com/support/#policies:eca'>Terms</a>
        <a class='DashboardLoginPage__footerLink' href='http://meraki.com/support/#policies:privacy'>Privacy</a>
        <span>&copy; 2018 Cisco Systems, Inc.</span>
      </div>
      </div>
    <div id='footerRight'>
    </div>
  </footer>
</div> <!-- /#container -->

<script type="text/javascript">
jQuery(document).ready(function(){jQuery("#email")[0].focus()})
</script>
<script>TypekitConfig={kitId:"hum1oye",scriptTimeout:1.5e3},function(){var a=document.getElementsByTagName("html")[0];a.className+=" wf-loading";var b=setTimeout(function(){a.className=a.className.replace(/(\s|^)wf-loading(\s|$)/g,""),a.className+=" wf-inactive"},TypekitConfig.scriptTimeout),c=document.createElement("script");c.src="//use.typekit.com/"+TypekitConfig.kitId+".js",c.type="text/javascript",c.async="true",c.onload=c.onreadystatechange=function(){var a=this.readyState;if(!a||a=="complete"||a=="loaded"){clearTimeout(b);try{Typekit.load(TypekitConfig)}catch(c){}}};var d=document.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d)}()</script>



</body>
</html>

`, 'utf-8'))
  res.end()

  return __filename
}
