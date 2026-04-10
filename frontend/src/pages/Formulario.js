//cadastro e edição de user 


//use state cria uma memoria para os campos local onde o react guarda os valores 
import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Stack,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'; //ferramenra de navegação entre pags 

//define endereço da api para facilitar 
const API_URL = 'http://localhost:3001';

const generoOptions = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Feminino', label: 'Feminino' },
  { value: 'Outro', label: 'Outro' },
];


//para manter a formatação do cpf 
//cortando os numero com a formatação 000.000.000-00 - padrao no br 
//alem disso limpando tudo que nao for numero e limitando a 11 digitos

const formatCpf = (value) => {
  const digits = (value || '').replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return digits.replace(/(\d{3})(\d+)/, '$1.$2');
  if (digits.length <= 9) return digits.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
};


//memoria com state das informações 

//nome valor atual set nome funcao q usamos para mudar esse valor 
export default function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [genero, setGenero] = useState('Feminino');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false); //para mostrar o carregamento 
  const [error, setError] = useState(''); //para mostrar msg de erro
  const [fieldErrors, setFieldErrors] = useState({}); //para erros especificos nos campos
  const navigate = useNavigate(); //redirecionar para pags ex voltas, salvar
  const { id } = useParams(); //pega o id via url 



  //recuperação dos dados em caso de edição
  useEffect(() => {
    if (id) { //se id  existe é pq o user quer editar
      setLoading(true); //comeca carregamento 
      setError(''); //limpa os erros para tela ficar limpa 

      //faz a requisição para pegar os dados do user e preencher o form com eles

      fetch(`${API_URL}/usuarios/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Usuário não encontrado'); 
          return res.json();
        })
                        
        .then((data) => { //preenche os campos do form com os dados do user
          setNome(data.nome || '');
          setEmail(data.email || '');
          setCpf(formatCpf(data.cpf || ''));//formata cpf
          setGenero(data.genero || 'Feminino');
          setDataNascimento(data.data_nascimento ? data.data_nascimento.slice(0, 10) : '');//corta por conta da alteração de formato em eng o formato é AAAA-MM-DD e precisamos só da data
          setTelefone(data.telefone || '');
        })
        .catch((err) => setError(err.message)) 
        .finally(() => setLoading(false));//PARA DE CARREGAR
    }
  }, [id]); //o use effect vai rodar quando a pessoa clicar para editar um user diferente

  const salvar = () => {
    setError('');

    const errors = {}; //guarda os erros de cada campo

    //AQUI REGISTRAMOS POSSIVEIS ERROS DE VALIDACAO P CADA CAMPO 
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    const telefoneRegex = /^[0-9]+$/;
    const cpfDigits = cpf.replace(/\D/g, '');
    const cpfRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const today = new Date(); //CRIA UM OBJ COM A DATA E A HORA DE HJ 
    const selectedDate = dataNascimento ? new Date(dataNascimento) : null; //NEW DATE TRANFORMA EM DATA OFICIAL 

    //validações 
    if (!nome.trim()) {
      errors.nome = 'Nome obrigatório.';
    } else if (!nomeRegex.test(nome.trim())) { //.TEST VERIFICA SE O TEXTO SEGUE A REGRA
      errors.nome = 'Nome deve conter apenas letras';
    }

    if (!email.trim()) {
      errors.email = 'E-mail obrigatório.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'E-mail inválido.';
    }

    if (!cpf.trim()) {
      errors.cpf = 'CPF obrigatório.';
    } else if (!cpfRegex.test(cpfDigits)) {
      errors.cpf = 'CPF inválido. Use 11 dígitos numéricos.';
    }

    if (!dataNascimento.trim()) {
      errors.data_nascimento = 'Data de nascimento obrigatória.';
    } else if (!selectedDate || selectedDate > today) { //NGM, PODE NASCER AMANHA 
      errors.data_nascimento = 'Data de nascimento inválida.';
    }

    if (telefone.trim() && !telefoneRegex.test(telefone.trim())) {
      errors.telefone = 'Telefone deve conter apenas números.';
    }
//VERIFICA SE O OBJETO ERRO TEM ALGO SE TIVER MOSTRA OS ERROS NOS CAMPOS 
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Corrija os campos em destaque abaixo.');
      return;
    }

    setFieldErrors({});
    setLoading(true); //SE PASSOU NA VALIDAÇÃO VAI PARA A API


    const metodo = id ? 'PUT' : 'POST'; //VERIFICA SE JA POSSUI ID PARA SABER SE É EDIÇÃO OU CREATE
    const url = id ? `${API_URL}/usuarios/${id}` : `${API_URL}/usuarios`; //DEFINE A URL PARA A REQUISIÇÃO

    fetch(url, { //FAZ A REQUISIÇÃO PARA API COM OS DADOS DO FORM
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ //CONVERSAO JSON P BANCO DE DADOS
        nome,
        email,
        cpf: formatCpf(cpf),
        genero,
        data_nascimento: dataNascimento,
        telefone,
      }),
    })
      .then(async (res) => { //PARA DEIXAR O CODIGO MAIS ROBUSTO AO LER UMA MSG DE ERRO, SEM PARAR COMPLETAMENTE O FORM
        const text = await res.text();
        let body = null;
        try {
          body = text ? JSON.parse(text) : null;
        } catch {
          body = null;
        }
//res.ok É UMA FORMA DE SEGURANÇA 
        if (!res.ok) { //SET IVER OCORRIDO ERRO MOSTRA A MENSAGEM DE ERRO VINDO DA API OU UMA MENSAGEM GENERICA
          const message = body?.erro || body?.message || text || 'Erro ao salvar usuário.';
          throw new Error(message);
        }

        return body; //SE DEU CERTO 
      })
      .then(() => navigate('/')) //SUCESSO VOLTA P LISTAGEM
      .catch((err) => setError(err.message)) //ERRO MOSTRA ALERT EM TELA
      .finally(() => setLoading(false)); //FIM DO CARREGAMETNO 
  };

  //BLOCO VISUAL OQ O USER VE 

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Editar usuário' : 'Cadastrar usuário'}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Preencha os campos abaixo para salvar ou atualizar um usuário.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); salvar(); }}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Nome"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={!!fieldErrors.nome}
              helperText={fieldErrors.nome}
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            sx={{ bgcolor: '#fff', borderRadius: 2 }}
          />

          <TextField
            label="CPF"
            fullWidth
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(formatCpf(e.target.value))}
            error={!!fieldErrors.cpf}
            sx={{ bgcolor: '#fff', borderRadius: 2 }}
          />

          <TextField
            label="Gênero"
            select
            fullWidth
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            sx={{ bgcolor: '#fff', borderRadius: 2 }}
          >
            {generoOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            
            type="date"
            fullWidth
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                max: new Date().toISOString().slice(0, 10),
              },
            }}
            error={!!fieldErrors.data_nascimento}
            helperText={fieldErrors.data_nascimento}
            sx={{ bgcolor: '#fff', borderRadius: 2 }}
          />

          <TextField
            label="Telefone"
            fullWidth
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            error={!!fieldErrors.telefone}
            helperText={fieldErrors.telefone}
            sx={{ bgcolor: '#fff', borderRadius: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/') }>
              Voltar
            </Button>
          </Box>
        </Stack>
      </Box>
      )}
    </Paper>
  );
}


