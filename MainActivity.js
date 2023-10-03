package com.example.socketapp;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.os.AsyncTask;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        EditText msg = findViewById(R.id.msg);

        // Create a button to trigger the TCP communication
        Button connectButton = findViewById(R.id.connectButton);
        connectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                MyTcpClient tcpClient1 = new MyTcpClient(MainActivity.this, "8.tcp.ngrok.io", 11523);
                // Very imp line to use Async task to send multiple text with one connection
                tcpClient1.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR, msg.getText().toString());
            }
        });
    }

    // Handle the server's response in this method
    protected void onProgressUpdate(String... values) {
        String response = values[0];
        Toast.makeText(this, "Response: "+ response, Toast.LENGTH_SHORT).show();
    }
}
