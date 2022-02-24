import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
//ye class hamne isliye bnaya hai ki har ek httprequest ko intercept krke usme authorization header add kar sake
//when we hit api from postman then we provide key-Authorization and value=token
//similiarly this class will help us to provide token during api hitting
@Injectable()
 export class AuthInterceptor implements HttpInterceptor{

   constructor(private login:LoginService){}
//    jaise hi ham request marte hai ye interceptor automatic call ho jayega aur req me original request hoga
//    next ka use krke request ko aage bdha sakte hai. Hamne is req me apna token add krke clone bna diya
//    fir forward kar diye
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
       const token= this.login.getToken();
       let authReq=req;
            console.log("Inside Interceptor")
        
       if(token!=null)
       {
           authReq=authReq.clone({
               setHeaders:{Authorization:`Bearer ${token}`}
            })
       }
       return next.handle(authReq)
    }
    
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    }
]