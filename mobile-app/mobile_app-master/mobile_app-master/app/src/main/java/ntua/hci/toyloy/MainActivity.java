package ntua.hci.toyloy;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.LruCache;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;

import ntua.hci.toyloy.ui.login.LoginActivity;


public class MainActivity extends AppCompatActivity {

    public static final String EXTRA_TEXT_FROM = "com.example.application.example.EXTRA_TEXT_FROM";
    public static final String EXTRA_TIME = "com.example.application.example.EXTRA_TIME";
    public static final String EXTRA_TEXT_COUNTRY = "com.example.application.example.EXTRA_TEXT_COUNTRY";
    public static final String EXTRA_NEW = "com.example.application.example.EXTRA_NEW";

    private ImageView imagelogout;

    private FirebaseAuth firebaseAuth;

    private Button button;
    private EditText DateFrom;
    Spinner spinnerform;
    String spinnerformvalue;
    String results;

    private TextView textViewResult;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        spinnerform = (Spinner) findViewById(R.id.spinnerform);
        button = (Button) findViewById(R.id.btn_search);
        imagelogout = (ImageView) findViewById(R.id.log_out_main);
        DateFrom = (EditText) findViewById(R.id.date_from);

        firebaseAuth = FirebaseAuth.getInstance();


        imagelogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                firebaseAuth.signOut();
                finish();
                startActivity(new Intent(MainActivity.this, LoginActivity.class));
            }
        });
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(MainActivity.this, android.R.layout.simple_list_item_1, getResources().getStringArray(R.array.Form));
        spinnerform.setAdapter(adapter);


        //Adding setOnItemSelectedListener method on spinner.
        spinnerform.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view,
                                       int position, long id) {
                spinnerformvalue = (String)spinnerform.getSelectedItem();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                // TODO Auto-generated method stub

            }
        });

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoFormActivity(spinnerformvalue);
            }
        });
        DateFrom.addTextChangedListener(setTextWatcher);

    }



    public void gotoFormActivity (String spinnerformvalue) {
        EditText txtFromdate = (EditText) findViewById(R.id.date_from);
        Spinner spCountry = (Spinner) findViewById(R.id.spinnerCountry);
        Spinner spTime = (Spinner) findViewById(R.id.spinnerTime);
        String fromstring = txtFromdate.getText().toString();
        String country = (String) spCountry.getSelectedItem();
        String timeOld = (String) spTime.getSelectedItem();

        String[] time = timeOld.split(" ");
        String newtime = "PT" + time[0] + "N";
        switch(spinnerformvalue) {

            case "Array":
                Intent intentgraph = new Intent(MainActivity.this, GraphActivity.class);
                intentgraph.putExtra(EXTRA_TEXT_FROM, fromstring);
                intentgraph.putExtra(EXTRA_TEXT_COUNTRY, country);
                intentgraph.putExtra(EXTRA_TIME, newtime);

                startActivity(intentgraph);
                break;

            case "Ravdo":
                Intent intentravdo = new Intent(MainActivity.this, RavdoActivity.class);
                intentravdo.putExtra(EXTRA_TEXT_FROM, fromstring);
                intentravdo.putExtra(EXTRA_TEXT_COUNTRY, country);
                intentravdo.putExtra(EXTRA_TIME, newtime);

                startActivity(intentravdo);
                break;
        }

    }

    private TextWatcher setTextWatcher = new TextWatcher() {
        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
            String StartDate = DateFrom.getText().toString().trim();
            ////// Allakse to /////////
            button.setEnabled(!StartDate.equals("fr"));
        }

        @Override
        public void afterTextChanged(Editable s) {

        }
    };


}
