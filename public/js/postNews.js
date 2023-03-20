const postNewsBtn = document.getElementById('post-button');
const editPostBtn = document.getElementById('edit-post');
const hapusPostPost = document.getElementById('hapus-post');

const hideAlert2 = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

if (postNewsBtn) {
  postNewsBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append('judul', document.getElementById('judul').value);
    form.append('isi', document.getElementById('isi').value);
    form.append('author', document.getElementById('author').value);
    form.append('type', document.getElementById('type').value);
    form.append('headline', document.getElementById('headline').value);
    try {
      const result = await axios.post('/post/create', form);

      if (result.data.status === 'Succes') location.assign('/post');
    } catch (err) {
      console.log(err.response);
    }
  });
}
document.addEventListener('click', async function (e) {
  if (e.target.id === 'edit-post-button') {
    e.preventDefault();
    const form = new FormData();
    form.append('judul', document.getElementById('judul').value);
    form.append('isi', document.getElementById('isi').value);
    form.append('type', document.getElementById('type').value);
    form.append('headline', document.getElementById('headline').value);
    try {
      const result = await axios.patch(
        `/post/${document
          .getElementById('data')
          .dataset.judul.split(' ')
          .join('-')}`,
        form
      );
      if (result.data.status === 'Succes')
        location.assign(
          `/post/${document.getElementById('judul').value.split(' ').join('-')}`
        );
    } catch (err) {
      console.log(err);
    }
  } else if (e.target.id === 'delete-post') {
    try {
      const result = await axios.delete(
        `/post/${document
          .getElementById('data')
          .dataset.judul.split(' ')
          .join('-')}`
      );
      if (result.data.status === 'Succes') location.assign('/post');
    } catch (err) {
      console.log(err.response);
    }
  } else if (e.target.id === 'edit-post') {
    const formEditPost = document.createElement('div');
    const classes = ['w-full', 'px-16'];
    formEditPost.classList.add(...classes);
    formEditPost.innerHTML = `<form class="flex flex-wrap w-1/5">
      <label for="judul">Judul Post</label>
      <input
        type="text"
        name="judul"
        value="${document.getElementById('data').dataset.judul}"
        id="judul"
        class="mb-5 ring-2 rounded-sm py-1 px-2"
      />
      <label for="isi">Isi Post</label>
      <textarea
        name="isi"
        id="isi"
        class="mb-5 ring-2 rounded-sm w-[330px] h-[400px]"
      ></textarea>
      <label for="isi">Jenis Berita</label>
      <select name="type" id="type" class="mb-5 ring-2 rounded-sm py-1 px-2">
      ${
        document.getElementById('data').dataset.type === 'berita'
          ? '<option value="berita" selected>berita</option>'
          : '<option value="berita">berita</option>'
      }
      ${
        document.getElementById('data').dataset.type === 'pengumuman'
          ? '<option value="pengumuman" selected>Pengumuman</option>'
          : '<option value="pengumuman">Pengumuman</option>'
      }
      </select>
  
      <label for="headline">Post Utama</label>
      <select
        name="headline"
        id="headline"
        class="mb-5 ring-2 rounded-sm py-1 px-2"
      >
      ${
        document.getElementById('data').dataset.headline === 'true'
          ? '<option value="true" selected>Ya</option>'
          : '<option value="true">Ya</option>'
      }
      ${
        document.getElementById('data').dataset.headline === 'false'
          ? '<option value="false" selected>Tidak</option>'
          : '<option value="false">Tidak</option>'
      }
        
      </select>
      <div class="w-full">
        <button
          id="edit-post-button"
          class="py-2 px-4 bg-sky-400 rounded-lg font-semibold text-white mt-3"
        >
          Edit Post
        </button>
      </div>
    </form>
    <div class="inline-block cursor-pointer">
    <p id="batal-button" class="py-2 px-4 bg-red-400 rounded-lg font-semibold text-white mt-3">Batal</p>
    </div>
    `;
    e.target.parentNode.parentNode.parentNode.parentNode.replaceChild(
      formEditPost,
      e.target.parentNode.parentNode.parentNode.parentNode.children[0]
    );
  } else if (e.target.id === 'batal-button') {
    const postPage = document.createElement('div');
    postPage.classList.add('main');
    postPage.innerHTML = `<div id="main">
    <div class="w-full flex flex-wrap">
    <div class="cursor-pointer w-28 text-center text-white font-semibold mb-4">
      <p id="edit-post" class="px-2 py-3 bg-sky-400 rounded-lg mx-2">Edit Post</p>
    </div>
    <div class="cursor-pointer w-28 text-center text-white font-semibold mb-4">
      <p id="delete-post" class="px-2 py-3 bg-red-400 rounded-lg">Hapus Post</p>
    </div>
    <div class="w-full">
      <img
        class="w-[600px] h-[400px]"
        src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIzfHxmcmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      />
      </div>
    </div>
    <div class="w-full py-5 pl-5 md:w-1/2 md:pl-0">
      <h1 class="font-semibold text-2xl">${
        document.getElementById('data').dataset.judul
      }</h1>
    </div>
    <div class="w-full px-5 md:w-1/2 md:px-0">
      <p class="text-xs pb-2">
      ${document.getElementById('data').dataset.nama}, ${
      document.getElementById('data').dataset.createdat
    }
      </p>
      <p>${document.getElementById('data').dataset.isi}</p>
    </div>
  </div>`;
    e.target.parentNode.parentNode.parentNode.replaceChild(
      postPage,
      e.target.parentNode.parentNode.parentNode.children[0]
    );
  } else if (e.target.id === 'login-button') {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('email', document.getElementById('email').value);
      form.append('password', document.getElementById('password').value);
      const result = await axios.post('/login', form);
      if (result.data.status === 'Succes') this.location.assign('/');
    } catch (err) {
      const error = document.createElement('div');
      const errorClass = [
        'text-white',
        'font-semibold',
        'w-1/2',
        'mx-auto',
        'px-3',
        'py-3',
        'rounded-md',
        'bg-red-400',
        'md:w-1/3',
        'alert',
      ];
      error.classList.add(...errorClass);
      error.innerHTML = `<p>${err.response.data.message}</p>`;
      document.getElementById('parent-login').prepend(error);
      window.setTimeout(hideAlert2, 3000);
    }
  }
});
