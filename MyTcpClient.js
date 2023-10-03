package com.example.socketapp;

import android.os.AsyncTask;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class MyTcpClient extends AsyncTask<String, String, String> {
    private MainActivity activity; // Replace with your actual activity class
    private final String serverHost;
    private final int serverPort;

    public MyTcpClient(MainActivity activity, String serverHost, int serverPort) {
        this.activity = activity;
        this.serverHost = serverHost;
        this.serverPort = serverPort;
    }

    @Override
    protected String doInBackground(String... messages) {

        try (Socket socket = new Socket(serverHost, serverPort);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
            for (String message:messages){
                out.println(message);
                String response = in.readLine();
                Toast.makeText(activity, "Response: " + response, Toast.LENGTH_SHORT).show();
                publishProgress(response);
            }
            return null;
        } catch (IOException e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    protected void onProgressUpdate(String... responses) {
        // Handle each response here (update UI, etc.)
        if (activity != null && responses.length > 0) {
            String response = responses[0];
            Toast.makeText(activity, "Response: "+response, Toast.LENGTH_SHORT).show();

            // Update UI or perform other actions with the response
//            activity.handleResponse(response);
        }
    }
}

