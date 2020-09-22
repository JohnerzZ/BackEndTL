package ntua.hci.toyloy.ui.login;

import ntua.hci.toyloy.API;
import ntua.hci.toyloy.RetrofitClient;

public class ApiUtils {


    public static final String BASE_URL = "http://localhost:8765/energy/api/";

    public static API getUserService(){
        return RetrofitClient.getClient(BASE_URL).create(API.class);
    }
}
