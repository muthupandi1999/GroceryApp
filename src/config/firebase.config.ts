import admin from "firebase-admin";
import { serviceAccount } from "../../src/services/service.account";

const serviceAccountKey = {
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    private_key_id: serviceAccount.private_key_id,
    client_id: serviceAccount.client_id,
    auth_uri: serviceAccount.auth_uri,
    token_uri: serviceAccount.token_uri,
    auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

export default admin