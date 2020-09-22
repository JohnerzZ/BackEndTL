package ntua.hci.toyloy;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;

import ntua.hci.toyloy.ui.login.LoginActivity;

public class RavdoActivity extends AppCompatActivity {

    private Button btnNewSearch, btnGraph;
    private ImageView imagelogout;
    private FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ravdo);

        imagelogout = (ImageView) findViewById(R.id.log_out_ravdo);
        firebaseAuth = FirebaseAuth.getInstance();

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

        TextView textview = (TextView) findViewById(R.id.txtResults);
        String start_info = "The consumed energy in\n" + country + "\nfor the given period\nis shown above";
        textview.setText(start_info);



        btnNewSearch = (Button) findViewById(R.id.btnnewsearch);
        btnGraph = (Button) findViewById(R.id.btngraph);

        btnNewSearch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoMainActivity();
            }
        });

        btnGraph.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoGraphActivity();
            }
        });




    }



    public void gotoMainActivity () {
        Intent intent = new Intent(RavdoActivity.this, MainActivity.class);
        startActivity(intent);

    }

    public void gotoLoginActivity () {
        Intent intent = new Intent(RavdoActivity.this, LoginActivity.class);
        startActivity(intent);

    }
    public void gotoGraphActivity () {
        Intent intent = getIntent();
        String fromdate = intent.getStringExtra(MainActivity.EXTRA_TEXT_FROM);
        String time = intent.getStringExtra(MainActivity.EXTRA_TIME);
        String country = intent.getStringExtra(MainActivity.EXTRA_TEXT_COUNTRY);

        Intent intentG = new Intent(RavdoActivity.this, GraphActivity.class);
        intentG.putExtra(MainActivity.EXTRA_TEXT_FROM, fromdate);
        intentG.putExtra(MainActivity.EXTRA_TIME, time);
        intentG.putExtra(MainActivity.EXTRA_TEXT_COUNTRY, country);

        startActivity(intentG);

    }




}
