# -*- coding: utf-8 -*-
"""
Created on Tue Jan 03 13:30:41 2012

@author: jharston
"""
import webapp2 as webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template
import os
from uber import uber_lib
import history_tables
import rest_funcs

class przm_examshistoryPage(webapp.RequestHandler):
    def get(self):
        templatepath = os.path.dirname(__file__) + '/../templates/'
        ChkCookie = self.request.cookies.get("ubercookie")
        html = uber_lib.SkinChk(ChkCookie)
        html = html + template.render(templatepath + '02uberintroblock_wmodellinks.html', {'model':'przm_exams','page':'history'})
        html = html + template.render(templatepath + '03ubertext_links_left.html', {})                       
        html = html + template.render(templatepath + '04uberalgorithm_start.html', {
                'model':'przm_exams', 
                'model_attributes':'PRZM-EXAMS User History'})
        html = html + template.render(templatepath + 'history_pagination.html', {})                
        hist_obj = rest_funcs.user_hist('admin', 'przm_exams')
        html = html + history_tables.table_all(hist_obj)
        html = html + template.render(templatepath + '04ubertext_end.html', {})
        html = html + template.render(templatepath + '06uberfooter.html', {'links': ''})
        self.response.out.write(html)

app = webapp.WSGIApplication([('/.*', przm_examshistoryPage)], debug=True)

def main():
    run_wsgi_app(app)

if __name__ == '__main__':
    main()
    

