const dataDropdown = document.getElementById('data-dropdown');
const dropdown = document.getElementById('dropdown');
const registerGuruBtn = document.getElementById('registerGuruBtn');
const registerSiswaBtn = document.getElementById('registerSiswaBtn');
const searchBtn = document.getElementById('search-btn');
const query = document.getElementById('query');
const sectionSearch = document.getElementById('section-search');
const sectionData = document.getElementById('section-data');
const parentData = document.getElementById('parent-data');
const reset = document.getElementById('reset');

// const error = document.createElement('div');
// const errorClass = [
//   'text-white',
//   'font-semibold',
//   'fixed',
//   'top-16',
//   'py-3',
//   'px-20',
//   'bg-red-400',
//   'rounded-lg',
//   'alert',
// ];
// error.classList.add(...errorClass);
// error.innerHTML = `<p>Error</p>`;

// document.getElementById('error-msg').append(error);

const requestApi = async (data, method, type) => {
  if (method === 'post') {
    const result = await axios.post(
      `http://localhost:3000/api/v1/${type}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return result;
  }
  if (method === 'patch') {
    const result = await axios.patch(
      `http://localhost:3000/api/v1/${type}/${document
        .getElementById('data-user')
        .dataset.nama.split(' ')
        .join('-')}`,
      data
    );
    return result;
  }
};

const hideAlert = () => {
  const el = document.getElementById('.alert');
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg, loc) => {
  hideAlert();
  if (type === 'success') {
    const error = document.createElement('div');
    const errorClass = [
      'text-white',
      'font-semibold',
      'fixed',
      'top-16',
      'py-3',
      'px-20',
      'bg-green-400',
      'rounded-lg',
      'alert',
    ];
    error.classList.add(...errorClass);
    error.innerHTML = `<p>${msg}</p>`;
    loc.append(error);
    window.setTimeout(hideAlert, 3000);
  } else {
    const error = document.createElement('div');
    const errorClass = [
      'text-white',
      'font-semibold',
      'fixed',
      'top-16',
      'py-3',
      'px-20',
      'bg-red-400',
      'rounded-lg',
      'alert',
    ];
    error.classList.add(...errorClass);
    error.innerHTML = `<p>${msg}</p>`;
    loc.append(error);
    window.setTimeout(hideAlert, 3000);
  }
};

if (reset) {
  reset.children[2].addEventListener('click', async function (e) {
    e.preventDefault();
    try {
      const email = document.getElementById('email').value;
      const result = await axios.post(`http://localhost:3000/reset`, { email });
      console.log(result);
      if (result.data.status === 'Succes') {
        showAlert('success', 'Link telah dikirim ke email', parentData);
      }
    } catch (err) {
      console.log(err.response.data.message);
      showAlert('error', err.response.data.message, parentData);
    }
  });
}

/////////////// Update Siswa //////////////////
if (parentData) {
  parentData.addEventListener('click', function eventHandler(ef) {
    const formEditSiswa = document.getElementById('form-edit-siswa');
    const formEditGuru = document.getElementById('form-edit-guru');
    if (formEditSiswa) {
      formEditSiswa.addEventListener('submit', async function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const form = new FormData();
        form.append('nama', document.getElementById('nama').value);
        form.append('umur', document.getElementById('umur').value);
        form.append('alamat', document.getElementById('alamat').value);
        form.append('nik', document.getElementById('nik').value);
        form.append('ttl', document.getElementById('ttl').value);
        form.append('kelas', document.getElementById('kelas').value);
        form.append('waliKelas', document.getElementById('waliKelas').value);
        form.append('angkatan', document.getElementById('angkatan').value);
        form.append(
          'nomorPonsel',
          document.getElementById('nomorPonsel').value
        );
        form.append(
          'nomorPonselOrangtua',
          document.getElementById('nomorPonselOrangtua').value
        );
        try {
          const result = await requestApi(form, 'patch', 'siswa');
          const nama = document.getElementById('nama').value;
          let name = nama.split(' ');
          for (i = 0; i < name.length; i++) {
            name[i] =
              name[i][0].toUpperCase() + name[i].substring(1).toLowerCase();
          }
          name = name.join(' ');
          if (result.data.status === 'Succes')
            location.assign(`/siswa/${name.split(' ').join('-')}`);
        } catch (err) {
          console.log(err);
          if (err.response.data.message.startsWith('Nik'))
            return showAlert('error', err.response.data.message, parentData);
          if (err.response.data.message.includes('umur'))
            return showAlert('error', err.response.data.message, parentData);
          if (err.response.data.message.includes('angkatan'))
            return showAlert('error', err.response.data.message, parentData);
          if (err.response.data.message.includes('nik'))
            return showAlert('error', err.response.data.message, parentData);
        }
      });
    }
    /////////////////////////////////Edit Guru//////////////////////////////////
    if (formEditGuru) {
      formEditGuru.addEventListener('submit', async function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const form = new FormData();
        form.append('nama', document.getElementById('nama').value);
        form.append('umur', document.getElementById('umur').value);
        form.append('alamat', document.getElementById('alamat').value);
        form.append('nik', document.getElementById('nik').value);
        form.append('ttl', document.getElementById('ttl').value);
        form.append('email', document.getElementById('email').value);
        form.append('role', document.getElementById('role').value);
        try {
          const result = await requestApi(form, 'patch', 'guru');
          const nama = document.getElementById('nama').value;
          console.log(result);
          let name = nama.split(' ');
          for (i = 0; i < name.length; i++) {
            name[i] =
              name[i][0].toUpperCase() + name[i].substring(1).toLowerCase();
          }
          name = name.join(' ');
          if (result.data.status === 'Succes')
            location.assign(`/guru/${name.split(' ').join('-')}`);
        } catch (err) {
          if (err.response.data.message.startsWith('Nik'))
            return showAlert('error', err.response.data.message, parentData);
          if (err.response.data.message.includes('umur'))
            return showAlert('error', err.response.data.message, parentData);
          if (err.response.data.message.includes('angkatan'))
            return showAlert('error', err.response.data.message, parentData);
          if (err.response.data.message.includes('nik'))
            return showAlert('error', err.response.data.message, parentData);
        }
      });
    }
  });
}

dataDropdown.addEventListener('click', function (e) {
  e.target.parentNode.parentNode.nextElementSibling.classList.remove('hidden');
  dropdown.classList.add('show');
  e.stopPropagation();
});
document.addEventListener('click', function () {
  if (dropdown.classList.contains('show')) {
    dropdown.classList.add('hidden');
    dropdown.classList.remove('show');
  }
});
if (registerGuruBtn) {
  registerGuruBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const form = new FormData();
    form.append('nama', document.getElementById('nama').value);
    form.append('umur', document.getElementById('umur').value);
    form.append('alamat', document.getElementById('alamat').value);
    form.append('nik', document.getElementById('nik').value);
    form.append('ttl', document.getElementById('ttl').value);
    form.append('email', document.getElementById('email').value);
    form.append('role', document.getElementById('role').value);
    form.append('nomorPonsel', document.getElementById('nomorPonsel').value);
    form.append('password', document.getElementById('password').value);
    form.append(
      'passwordConfirm',
      document.getElementById('passwordConfirm').value
    );
    try {
      const result = await requestApi(form, 'post', 'guru');
      const nama = document.getElementById('nama').value;
      let name = nama.split(' ');
      for (i = 0; i < name.length; i++) {
        name[i] = name[i][0].toUpperCase() + name[i].substring(1).toLowerCase();
      }
      name = name.join(' ');
      console.log(result.data.status);
      if (result.data.status === 'Succes')
        location.assign(`/guru/${name.split(' ').join('-')}`);
    } catch (err) {
      console.log(err);
      if (err.response.data.message.includes('umur'))
        return showAlert(
          'error',
          err.response.data.message,
          document.getElementById('error-msg')
        );
      if (err.response.data.message.includes('password'))
        return showAlert(
          'error',
          err.response.data.message,
          document.getElementById('error-msg')
        );
      if (err.response.data.message.includes('Nik'))
        return showAlert(
          'error',
          err.response.data.message,
          document.getElementById('error-msg')
        );
    }
  });
}

if (registerSiswaBtn) {
  registerSiswaBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append('nama', document.getElementById('nama').value);
    form.append('umur', document.getElementById('umur').value);
    form.append('alamat', document.getElementById('alamat').value);
    form.append('nik', document.getElementById('nik').value);
    form.append('ttl', document.getElementById('ttl').value);
    form.append('kelas', document.getElementById('kelas').value);
    form.append('waliKelas', document.getElementById('waliKelas').value);
    form.append('angkatan', document.getElementById('angkatan').value);
    form.append('nomorPonsel', document.getElementById('nomorPonsel').value);
    form.append(
      'nomorPonselOrangtua',
      document.getElementById('nomorPonselOrangtua').value
    );
    console.log(form);
    try {
      const result = await requestApi(form, 'post', 'siswa');
      const nama = document.getElementById('nama').value;
      let name = nama.split(' ');
      for (i = 0; i < name.length; i++) {
        name[i] = name[i][0].toUpperCase() + name[i].substring(1).toLowerCase();
      }
      name = name.join(' ');
      console.log(result);

      if (result.data.status === 'Succes')
        location.assign(`/siswa/${name.split(' ').join('-')}`);
    } catch (err) {
      console.log(err.response);
      if (err.response.data.message.includes('umur'))
        return showAlert(
          'error',
          err.response.data.message,
          document.getElementById('error-msg')
        );
      if (err.response.data.message.includes('angkatan'))
        return showAlert(
          'error',
          err.response.data.message,
          document.getElementById('error-msg')
        );
      if (err.response.data.message.includes('nik'))
        return showAlert(
          'error',
          err.response.data.message,
          document.getElementById('error-msg')
        );
    }
  });
}

////////////// SEARCH ENGINE ///////////////
const QuerySearch = (main, siblings) => {
  const sib = [];
  for (i = 0; i < siblings.length; i++) {
    sib.push(siblings[i]);
  }
  const sibFilter = sib.filter((e) => e.textContent !== main.textContent);
  sibFilter.forEach((e) => {
    e.className = '';
    const classBtn = [
      'bg-sky-500',
      'py-1',
      'px-2',
      'rounded-full',
      'cursor-pointer',
    ];
    e.classList.add(...classBtn);
  });
  main.className = '';
  const classMainBtn = [
    'bg-sky-400',
    'py-1',
    'px-2',
    'rounded-full',
    'cursor-pointer',
  ];
  main.classList.add(...classMainBtn);
  query.name = main.textContent.toLowerCase();
};

if (sectionSearch) {
  sectionSearch.addEventListener('click', function (e) {
    if (
      e.target.textContent === 'Nama' ||
      e.target.textContent === 'Nik' ||
      e.target.textContent === 'Angkatan' ||
      e.target.textContent === 'Kelas'
    ) {
      QuerySearch(e.target, e.target.parentNode.children);
    }
    if (e.target.innerText === 'Guru' || e.target.textContent === 'Siswa') {
      QuerySearch(e.target, e.target.parentNode.children);
      const classBtn = [
        'bg-sky-500',
        'py-1',
        'px-2',
        'rounded-full',
        'cursor-pointer',
      ];
      for (element of e.target.parentNode.parentNode.nextElementSibling
        .children) {
        element.className = '';
        element.classList.add(...classBtn);
      }
    }
  });
}

const returnResult = async (query, value, endPoint) => {
  if (query === 'nama') {
    const data = await axios.get(`http://localhost:3000/api/v1/${endPoint}`, {
      params: { nama: value },
    });
    return data;
  } else if (query === 'nik') {
    const data = await axios.get(`http://localhost:3000/api/v1/${endPoint}`, {
      params: { nik: value },
    });
    return data;
  } else if (query === 'angkatan') {
    const data = await axios.get(`http://localhost:3000/api/v1/${endPoint}`, {
      params: { angkatan: value },
    });
    return data;
  } else if (query === 'kelas') {
    const data = await axios.get(`http://localhost:3000/api/v1/${endPoint}`, {
      params: { kelas: value },
    });
    return data;
  }
};

if (searchBtn) {
  searchBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    const userNotFound = document.getElementById('user-not-found');
    if (userNotFound) {
      userNotFound.remove();
    }
    const user =
      e.target.parentNode.parentNode.children[0].children[0].children;
    const endPoints = [];
    for (e of user) {
      endPoints.push(e);
    }
    const endPoint = endPoints.filter((e) =>
      e.classList.contains('bg-sky-400')
    );
    const userData = document.getElementById('user-data');
    if (userData) {
      userData.remove();
    }
    const query = document.getElementById('query');
    try {
      const data = await returnResult(
        query.name,
        query.value,
        endPoint[0].innerText.toLowerCase()
      );
      if (!data.data.data.data.length) {
        if (document.getElementById('user-not-found')) {
          sectionData.children[0].children[0].remove();
        }
        const resultToUser = document.createElement('div');
        resultToUser.classList.add('w-full');
        resultToUser.id = 'user-not-found';
        resultToUser.innerHTML = `<p>Data ${query.value} tidak ditemukan</p>`;
        sectionData.children[0].append(resultToUser);
      } else {
        const resultToUser = document.createElement('div');
        resultToUser.classList.add('w-full');
        resultToUser.id = 'user-data';
        resultToUser.innerHTML = `<div class="text-xl font-semibold mb-5 flex justify-between w-full">
          <p>Foto</p>
          <p>Nama</p>
          <p>Umur</p>
          <p>Nik</p>
          <p>Detail</p>
        </div>
        <div class="w-full">
        ${data.data.data.data.map((e) => {
          return `<div class="w-full flex justify-between mb-2">
          <img
            class="w-[40px] h-[40px] rounded-md mr-8"
            src="https://images.unsplash.com/photo-1599519458632-a0689c81836e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMwfHxmcmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
          <div class="w-[10%] text-center mr-10">
            <p class="text-slate-600 text-sm">${e.nama}</p>
          </div>
          <div class="mr-6">
            <p class="text-slate-600 text-sm">${e.umur}</p>
          </div>

          <div>
            <p>${e.nik}</p>
          </div>
          <a href="http://localhost:3000/${endPoint[0].innerText.toLowerCase()}/${e.nama
            .split(' ')
            .join('-')}" class=""
            >Detail
            <span
              ><ion-icon name="arrow-forward-circle-outline"></ion-icon></span
          ></a>
        </div>`;
        })}
        </div>`;
        sectionData.children[0].append(resultToUser);
      }
    } catch (err) {}
  });
}

////////////////////// USER PAGE SCRIPT //////////////////////
