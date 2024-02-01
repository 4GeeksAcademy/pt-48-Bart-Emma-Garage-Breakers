const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			login: async (email, password) => {
				const actions = getActions();
				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						"username": email,
						"password": password
					})
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/login", requestOptions)
					const data = await resp.json();
					console.log("ok", data);
					localStorage.setItem("token", data.access_token);
					localStorage.setItem("username", email);
					return true;
				}
				catch (error) {
					console.error("There has been an error login in", error)
				}
			},

			signUp: async (email, password) => {
				const actions = getActions();
				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						"username": email,
						"password": password
					})
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/signUp", requestOptions)
					const data = await resp.json();
					console.log("ok", data);
					return true;
				}
				catch (error) {
					console.error("There has been an error login in", error)
				}
			},

			addCliente: async (clienteBody) => {
				const actions = getActions();
				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify(clienteBody)
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/new_client", requestOptions)
					const data = await resp.json();
					console.log("ok", data);
					return data.id;
				}
				catch (error) {
					console.error("There has been an error login in", error)
				}
			},

			addMoto: async (brand, model, year, mileage, tasks, client_id) => {
				const actions = getActions();
				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify({
						"brand": brand,
						"model": model,
						"year": year,
						"mileage": mileage,
						"tasks": tasks,
						"client_id": client_id
					})
				};
				try {

					const resp = await fetch(process.env.BACKEND_URL + "api/new_motorbike", requestOptions)
					const data = await resp.json();
					console.log("ok", data);
					return data.msg;
				}
				catch (error) {
					console.error("There has been an error login in", error)
				}
			},

			changeState: async (id) => {
				const actions = getActions();
				const requestOptions = {
					method: "PUT",
					headers: {
						"Content-type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify({
						"motorbike_id": id
					})
				};
				try {

					const resp = await fetch(process.env.BACKEND_URL + "api/update_status", requestOptions)
					const data = await resp.json();
					console.log("ok", data);
					return data;
				}
				catch (error) {
					console.error("There has been an error login in", error)
				}
			},

			deleteMoto: async (id) => {
				const actions = getActions();
				const requestOptions = {
					method: "DELETE",
					headers: {
						"Content-type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify({
						"motorbike_id": id
					})
				};
				try {

					const resp = await fetch(process.env.BACKEND_URL + "api/delete_moto", requestOptions)
					const data = await resp.json();
					console.log("ok", data);
					return data;
				}
				catch (error) {
					console.error("There has been an error login in", error)
				}
			},

			getMotos: async () => {
				const actions = getActions();
				const requestOptions = {
					method: "GET",
					headers: {

						"Authorization": "Bearer " + localStorage.getItem("token")
					},

				};
				try {

					const resp = await fetch(process.env.BACKEND_URL + "api/motorbikes_list", requestOptions)
					const data = await resp.json();
					console.log("ok", data);
					return data.motorbikes_list;
				}
				catch (error) {
					console.error("There has been an error login in", error)
				}
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
