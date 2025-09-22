/**
 * Copyright (c) OWOX, Inc.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var GitHubSource = class GitHubSource extends AbstractSource {

  constructor( configRange ) {
  
    super( configRange.mergeParameters({
      AccessToken: {
        isRequired: true,
        label: "Access Token",
        description: "GitHub API Access Token for authentication"
      },
      RepositoryName: {
        isRequired: true,
        label: "Repository Name",
        description: "GitHub repository name in format 'owner/repo'"
      },
      StartDate: {
        requiredType: "date",
        label: "Start Date",
        description: "Start date for data import",
        attributes: [CONFIG_ATTRIBUTES.MANUAL_BACKFILL]
      },
      EndDate: {
        requiredType: "date",
        label: "End Date",
        description: "End date for data import",
        attributes: [CONFIG_ATTRIBUTES.MANUAL_BACKFILL, CONFIG_ATTRIBUTES.HIDE_IN_CONFIG_FORM]
      },
      ReimportLookbackWindow: {
        requiredType: "number",
        isRequired: true,
        default: 2,
        label: "Reimport Lookback Window",
        description: "Number of days to look back when reimporting data"
      },
      CleanUpToKeepWindow: {
        requiredType: "number",
        label: "Clean Up To Keep Window",
        description: "Number of days to keep data before cleaning up"
      },
      MaxFetchingDays: {
        requiredType: "number",
        isRequired: true,
        default: 30,
        label: "Max Fetching Days",
        description: "Maximum number of days to fetch data for"
      },
      Fields: {
        isRequired: true,
        requiredType: "string",
        label: "Fields",
        description: "Comma-separated list of fields to fetch (e.g., date,stars,contributors)"
      },
      CreateEmptyTables: {
        requiredType: "string",
        default: "true",
        label: "Create Empty Tables",
        description: "Create tables with all columns even if no data is returned from API"
      }
    }));
  
    this.fieldsSchema = GitHubFieldsSchema;
  }
  
  /**
   * Single entry point for *all* fetches.
   * @param {Object} opts
   * @param {string} opts.nodeName
   * @param {Array<string>} opts.fields
   * @returns {Array<Object>}
   */
  fetchData({ nodeName, fields = [] }) {
    switch (nodeName) {
      case 'repository':
        const repoData = this.makeRequest({ endpoint: `repos/${this.config.RepositoryName.value}` });
        return this._filterBySchema({ items: [repoData], nodeName, fields });
        
      case 'contributors':
        // @TODO: limitation is 1000 contributors per page, so if there are more, we need to handle pagination
        const contribData = this.makeRequest({ endpoint: `repos/${this.config.RepositoryName.value}/contributors?per_page=1000` });
        return this._filterBySchema({ items: contribData, nodeName, fields });
        
      case 'repositoryStats':
        return this._fetchRepositoryStats({ nodeName, fields });
        
      default:
        throw new Error(`Unknown node: ${nodeName}`);
    }
  }

  /**
   * Fetch repository statistics data (stars and contributors count)
   * @param {Object} options - Fetch options
   * @param {string} options.nodeName - Node name for schema filtering
   * @param {Array<string>} options.fields - Array of fields to fetch
   * @returns {Array} Array of repository statistics data
   */
  _fetchRepositoryStats({ nodeName, fields }) {
    // Get repository info (includes stargazers_count)
    const repoData = this.makeRequest({ endpoint: `repos/${this.config.RepositoryName.value}` });

    // Get contributors list
    // @TODO: limitation is 1000 contributors per page, so if there are more, we need to handle pagination
    const contribData = this.makeRequest({ endpoint: `repos/${this.config.RepositoryName.value}/contributors?per_page=1000` });
   
    return this._filterBySchema({
      items: [{
        "date": new Date(new Date().setHours(0, 0, 0, 0)), 
        "stars": repoData.stargazers_count, 
        "contributors": contribData.length
      }],
      nodeName,
      fields
    });
  }

  /**
   * Make a request to GitHub API
   * @param {Object} options - Request options
   * @param {string} options.endpoint - API endpoint path (e.g., "repos/owner/repo")
   * @returns {Object} - API response parsed from JSON
   */
  makeRequest({ endpoint }) {
    const baseUrl = "https://api.github.com/";
    const url = `${baseUrl}${endpoint}`;
    
    const response = EnvironmentAdapter.fetch(url, {
      'method': 'get', 
      'muteHttpExceptions': true,
      'headers': {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${this.config.AccessToken.value}`,
        "User-Agent": "owox"
      }
    });
    const result = JSON.parse(response.getContentText());

    return result;
  }

  /**
   * Keep only requestedFields plus any schema-required keys.
   * @param {Object} options - Filter options
   * @param {Array<Object>} options.items - Array of items to filter
   * @param {string} options.nodeName - Node name for schema lookup
   * @param {Array<string>} options.fields - Array of requested fields
   * @returns {Array<Object>}
   */
  _filterBySchema({ items, nodeName, fields = [] }) {
    const schema = this.fieldsSchema[nodeName];
    const requiredFields = new Set(schema.requiredFields || []);
    const keepFields = new Set([...requiredFields, ...fields]);

    return items.map(item => {
      const result = {};
      for (const key of Object.keys(item)) {
        if (keepFields.has(key)) {
          result[key] = item[key];
        }
      }
      return result;
    });
  }
    
}
