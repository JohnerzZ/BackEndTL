package ntua.hci.toyloy.ui.login;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.StringRes;
import androidx.appcompat.app.AppCompatActivity;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;

import ntua.hci.toyloy.API;
import ntua.hci.toyloy.MainActivity;
import ntua.hci.toyloy.R;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {

    Retrofit.Builder builder = new Retrofit.Builder()
            .baseUrl("http://localhost:8765/energy/api/")
            .addConverterFactory(GsonConverterFactory.create());

    Retrofit retrofit = builder.build();
    API userClient = retrofit.create(API.class);




    private int counter = 5;
    private TextView Info;

    private EditText Email;
    private EditText Password;

    private Button loginButton;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Email = (EditText) findViewById(R.id.email);
        Password = (EditText) findViewById(R.id.password);

        Info = (TextView) findViewById(R.id.tvInfo);
        Info.setText("Remaining attempts: 5");


        loginButton = (Button) findViewById(R.id.btn_login);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                gotoMainActivity();
                //login();
            }
        });

        Email.addTextChangedListener(loginTextWatcher);
        Password.addTextChangedListener(loginTextWatcher);
    }
////////////// Enable Button /////////////////////////////////
    private TextWatcher loginTextWatcher = new TextWatcher() {
        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
            String usernameInput = Email.getText().toString().trim();
            String passwordInput = Password.getText().toString().trim();

            loginButton.setEnabled(!usernameInput.isEmpty() && !passwordInput.isEmpty());

        }

        @Override
        public void afterTextChanged(Editable s) {

        }
    };
/////////////////////////////////////////////////////////////
    public void gotoMainActivity () {
        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
        startActivity(intent);

    }


    private static String token;

    private void login(){
        String username = Email.getText().toString().trim();
        String password = Password.getText().toString().trim();

        Login login = new Login("gg", "123456");
        Call<User> call = userClient.login(login);

        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(LoginActivity.this, response.body().getToken(), Toast.LENGTH_SHORT).show();
                    token = response.body().getToken();
                    gotoMainActivity();
                }
                else {
                    Toast.makeText(LoginActivity.this, "token not correct", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Toast.makeText(LoginActivity.this, "error", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void getSecret(){

        Call<ResponseBody> call = userClient.getSecret(token);

        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) {
                    try {
                        Toast.makeText(LoginActivity.this, response.body().string(), Toast.LENGTH_SHORT).show();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                else {

                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {

            }
        });
    }





/*

    private void userLogin(){
        String username = Email.getText().toString().trim();
        String password = Password.getText().toString().trim();

        Call<LoginResponse> call = RetrofitClient
                .getInstance().getApi().userLogin(username, password);

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                LoginResponse loginResponse = response.body();

                if (!loginResponse.isStr().equals(" ")){
                    // save user
                    gotoMainActivity();
                } else {


                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {

            }
        });
    }*/
/*
    private void updatePost() {
        InFo info = new InFo(12, null, "New Text");

        Call<InFo> call = api.putInfo(5, info);

        call.enqueue(new Callback<InFo>() {
            @Override
            public void onResponse(Call<InFo> call, Response<InFo> response) {

                if (!response.isSuccessful()) {
                    textViewResult.setText("Code: " + response.code());
                    return;
                }

                InFo postResponse = response.body();

                String content = "";
                content += "Code: " + response.code() + "\n";
                content += "ID: " + postResponse.getId() + "\n";
                content += "User ID: " + postResponse.getUserId() + "\n";
                content += "Title: " + postResponse.getTitle() + "\n";
                content += "Text: " + postResponse.getText() + "\n\n";

                textViewResult.setText(content);
            }

            @Override
            public void onFailure(Call<InFo> call, Throwable t) {
                textViewResult.setText(t.getMessage());
            }
        });
    }

    private void createPost() {
        InFo info = new InFo(12, null, "New Text");

        Call<InFo> call = api.putInfo(5, info);

        call.enqueue(new Callback<InFo>() {
            @Override
            public void onResponse(Call<InFo> call, Response<InFo> response) {

                if (!response.isSuccessful()) {
                    textViewResult.setText("Code: " + response.code());
                    return;
                }

                InFo postResponse = response.body();

                String content = "";
                content += "Code: " + response.code() + "\n";
                content += "ID: " + postResponse.getId() + "\n";
                content += "User ID: " + postResponse.getUserId() + "\n";
                content += "Title: " + postResponse.getTitle() + "\n";
                content += "Text: " + postResponse.getText() + "\n\n";

                textViewResult.setText(content);
            }

            @Override
            public void onFailure(Call<InFo> call, Throwable t) {
                textViewResult.setText(t.getMessage());
            }
        });
    }

*/
/*
    private void validate( String userEmail, String userPassword){

        firebaseAuth.signInWithEmailAndPassword(userEmail, userPassword).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                if (task.isSuccessful()) {
                    Toast.makeText(LoginActivity.this, "Login Successful", Toast.LENGTH_SHORT).show();
                    gotoMainActivity();
                }else {
                    Toast.makeText(LoginActivity.this, "Login Failed", Toast.LENGTH_SHORT).show();
                    counter--;
                    Info.setText("Remaining attempts: " + counter);
                    if (counter == 0){
                        loginButton.setEnabled(false);

                    }
                }

            }
        });
    }

*/



}
