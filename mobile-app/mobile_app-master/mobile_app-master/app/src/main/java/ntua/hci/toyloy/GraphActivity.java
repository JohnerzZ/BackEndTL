package ntua.hci.toyloy;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;



import java.util.List;

import ntua.hci.toyloy.ui.login.LoginActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Retrofit;
import retrofit2.Response;
import retrofit2.converter.gson.GsonConverterFactory;

public class GraphActivity extends AppCompatActivity {

    private Button btnNewSearch, btnRavdo;
    private ImageView imagelogout;
    private FirebaseAuth firebaseAuth;

    private TextView textViewResult;

    private String res1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_graph);

        imagelogout = (ImageView) findViewById(R.id.log_out_graph);
        firebaseAuth = FirebaseAuth.getInstance();

//////////////////////////// Retrofit //// GET REQUEST //////////////////////////
        textViewResult = findViewById(R.id.text_view_result);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://localhost:8765/energy/api/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        API aPI = retrofit.create(API.class);

        Call<List<InFo>> call = aPI.getActTotLoads();

        call.enqueue(new Callback<List<InFo>>() {
            @Override
            public void onResponse(Call<List<InFo>> call, Response<List<InFo>> response) {

                if(!response.isSuccessful()){
                    textViewResult.setText("Code: " + response.code());
                    return;
                }

                List<InFo> actTotLoads = response.body();
                textViewResult.append("\nHello\n");
                for (InFo actTotLoad: actTotLoads){

                    String content = "";
                    content += "ActualTotalLoadValue: " + actTotLoad.getActualTotalLoadValue() + "\n";
                    content += "DateTimeUTC: " + actTotLoad.getDateTimeUTC() + "\n\n";

                    textViewResult.append(content);
                }
            }

            @Override
            public void onFailure(Call<List<InFo>> call, Throwable t) {
                textViewResult.setText(t.getMessage());
            }
        });



//////////////////////////////////////////////////////////////////////////

        imagelogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                firebaseAuth.signOut();
                finish();
                gotoLoginActivity();
            }
        });

        Intent intent = getIntent();
        String fromdate = intent.getStringExtra(MainActivity.EXTRA_TEXT_FROM);
        String time = intent.getStringExtra(MainActivity.EXTRA_TIME);
        String country = intent.getStringExtra(MainActivity.EXTRA_TEXT_COUNTRY);
        String res = intent.getStringExtra(MainActivity.EXTRA_NEW);


        String[] date = fromdate.split("-");
        String condition = "year";
        int i=0;
        for (String ymd: date){
            i++;
            if (i == 2) condition = "month";
            else if (i == 3) condition = "date";
        }
        final TextView textview = (TextView) findViewById(R.id.txtResults);


        String start_info = "The consumed energy in\n" + country + "\nfor the given period\nis shown above. USER ID = "  ;

        textview.setText(start_info);


        btnNewSearch = (Button) findViewById(R.id.btnnewsearch);
        btnRavdo = (Button) findViewById(R.id.btnravdo);

        btnNewSearch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoMainActivity();
            }
        });

        btnRavdo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoRavdoActivity();
            }
        });





    }

    public void gotoMainActivity () {
        //jsonParse();
        Intent intent = new Intent(GraphActivity.this, MainActivity.class);
        startActivity(intent);

    }

    public void gotoLoginActivity () {
        Intent intent = new Intent(GraphActivity.this, LoginActivity.class);
        startActivity(intent);

    }
    public void gotoRavdoActivity () {
        Intent intent = getIntent();
        String fromdate = intent.getStringExtra(MainActivity.EXTRA_TEXT_FROM);
        String time = intent.getStringExtra(MainActivity.EXTRA_TIME);
        String country = intent.getStringExtra(MainActivity.EXTRA_TEXT_COUNTRY);

        Intent intentR = new Intent(GraphActivity.this, RavdoActivity.class);
        intentR.putExtra(MainActivity.EXTRA_TEXT_FROM, fromdate);
        intentR.putExtra(MainActivity.EXTRA_TIME, time);
        intentR.putExtra(MainActivity.EXTRA_TEXT_COUNTRY, country);

        startActivity(intentR);

    }

}
