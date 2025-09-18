const { Platform } = require("react-native");
let Constants;
try {
  Constants = require("expo-constants");
  if (Constants && Constants.default) Constants = Constants.default;
} catch (e) {
  Constants = null;
}

let _baseUrl = null;

const detectHost = () => {
  try {
    const debuggerHost = Constants?.experienceUrl;
    if (debuggerHost) {
      let host = String(debuggerHost);
      const protoIdx = host.indexOf("://");
      if (protoIdx !== -1) host = host.slice(protoIdx + 3);
      host = host.split("/")[0];
      host = host.split(":")[0];
      if (host) return host;
    }
  } catch (e) {}

  try {
    if (Platform && Platform.OS === "android") return "10.0.2.2";
  } catch (e) {}

  return "localhost";
};

const getBaseUrl = () => {
  if (_baseUrl) return _baseUrl;
  const host = detectHost();
  _baseUrl = host ? `http://${host}:3000/` : "http://localhost:3000/";
  console.log("[studants.controller] baseUrl=", _baseUrl);
  return _baseUrl;
};

const setBaseUrl = (url) => {
  if (!url) return;
  if (!url.endsWith("/")) url = url + "/";
  _baseUrl = url;
  console.log("[studants.controller] baseUrl sobreescrito:", _baseUrl);
};

const handleResponse = async (res) => {
  if (!res) throw new Error("Sem resposta do servidor");
  const text = await res.text().catch(() => null);
  try {
    const json = text ? JSON.parse(text) : null;
    if (!res.ok) throw { status: res.status, body: json || text };
    return json;
  } catch (e) {
    if (!res.ok) throw { status: res.status, body: text };
    return text;
  }
};

const listStudants = async () => {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}studants`);
    return await handleResponse(res);
  } catch (err) {
    console.error("[studants.controller] Erro ao listar alunos:", err);
    throw err;
  }
};

const addStudant = async (studant) => {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}studants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studant),
    });
    return await handleResponse(res);
  } catch (err) {
    console.error("[studants.controller] Erro ao adicionar aluno:", err);
    throw err;
  }
};

const deleteStudant = async (id) => {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}studants/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return await handleResponse(res);
  } catch (err) {
    console.error("[studants.controller] Erro ao deletar aluno:", err);
    throw err;
  }
};

const updateStudant = async (id, studant) => {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}studants/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studant),
    });
    return await handleResponse(res);
  } catch (err) {
    console.error("[studants.controller] Erro ao atualizar aluno:", err);
    throw err;
  }
};

module.exports = {
  listStudants,
  addStudant,
  deleteStudant,
  updateStudant,
  setBaseUrl,
  getBaseUrl,
};
