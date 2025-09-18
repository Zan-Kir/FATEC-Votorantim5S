const fetchAddress = async (cep) => {
	if (!cep) return null;
	const cleaned = String(cep).replace(/[^0-9]/g, "");
	if (cleaned.length !== 8) return null;
	try {
		const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
		if (!res.ok) throw new Error(`ViaCEP responded ${res.status}`);
		const data = await res.json();
		if (data.erro) return null;
		return {
			cep: data.cep,
			logradouro: data.logradouro,
			bairro: data.bairro,
			cidade: data.localidade,
			estado: data.uf,
		};
	} catch (err) {
		console.error("[via_cep] error", err);
		return null;
	}
};

module.exports = { fetchAddress };
