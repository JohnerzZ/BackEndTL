package ntua.hci.toyloy;


import java.util.List;

import ntua.hci.toyloy.ui.login.Login;
import ntua.hci.toyloy.ui.login.User;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;


public interface API {

    @GET("ActualTotalLoad/Austria/PT30N/date/2018-01-5")
    Call<List<InFo>> getActTotLoads();

   /* @FormUrlEncoded
    @POST("Login")
    Call<LoginResponse> userLogin (
            @Field("username") String email,
            @Field("password") String password
    );*/

    @POST("Login")
    Call<User> login(@Body Login login);

    @GET("secretinfo")
    Call<ResponseBody> getSecret(@Header("Authorization") String autoToken);

   // @GET("ActualTotalLoad/Austria/PT30N/date/2018-01-5")
   // Call<List<InFo>> acL();

    //@PUT("posts/{id}")
   // Call<InFo> putInfo(@Path("id") int id, @Body InFo inFo);
}
